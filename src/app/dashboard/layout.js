import { redirect } from "next/navigation";
import { getLoggedUser } from "actions/auth";
import Navbar from "components/navbar";
import { getCourses } from "actions/course";
import NextTopLoader from "nextjs-toploader";

export default async function Layout({ children }) {
  const authRes = await getLoggedUser();
  if (!authRes.success) redirect("/");

  const coursesRes = await getCourses();

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <main className="flex">
        <Navbar courses={coursesRes.courses} loggedUser={authRes.user} />
        <section className="w-[85%] bg-sky-50 p-4">
          <div className="h-full space-y-5 rounded-md border border-gray-200 bg-white p-6">
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
