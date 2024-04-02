import Image from "next/image";
import { redirect } from "next/navigation";
import { getLoggedUser } from "actions/auth";
import { getCollege } from "actions/college";
import UserLoginForm from "components/forms/userLogin";
import CollegeSetupForm from "components/forms/collegeSetup";

export default async function Page() {
  const collegeRes = await getCollege();
  const authRes = await getLoggedUser();

  if (authRes.success) redirect("/dashboard");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center  gap-5 bg-sky-50 py-8">
        <div className="w-[85%] space-y-4 rounded-md border border-gray-200 bg-white p-8 md:w-[70%] lg:w-[40%]">
          {collegeRes.success ? (
            <div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={180}
                  height={180}
                  className="rounded-full"
                />
                <h1 className="text-center text-[clamp(1.5rem,5vw,1.7rem)] font-black">
                  {collegeRes.college.name}
                </h1>
              </div>
              <UserLoginForm />
            </div>
          ) : (
            <CollegeSetupForm />
          )}
        </div>
      </main>
    </>
  );
}
