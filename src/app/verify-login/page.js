"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyLogin } from "actions/auth";

export default function Page({ searchParams }) {
  const [message, setMessage] = useState("Verifying...");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await verifyLogin(searchParams.token);
      setMessage(res.message);
      if (res.success) return router.push("/dashboard");
      return router.push("/");
    })();
  }, [searchParams.token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-sky-50 p-8">
      <div className="rounded-md border border-gray-200 bg-white p-[clamp(1.5rem,5vw,2.5rem)]">
        <p className="text-center text-2xl font-semibold">{message}</p>
      </div>
    </main>
  );
}
