import { getLoggedUser } from "actions/auth";
import { getUsers } from "actions/user";
import Error from "components/error";
import NewCourseForm from "components/forms/newCourse";
import { H1, BackButton, SubmitButton } from "components/utilities";

export default async function Page() {
  const authRes = await getLoggedUser();

  if (authRes.success) {
    if (authRes.user.role === "teacher" || authRes.user.role === "student") {
      return (
        <Error statusCode={401} message="You are not allowed to access this" />
      );
    }
  }

  const usersRes = await getUsers("teacher");

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Course</H1>
        <SubmitButton
          text="Submit"
          loadingText="Submitting"
          form="new-course-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <NewCourseForm teachers={usersRes.users} />
    </>
  );
}
