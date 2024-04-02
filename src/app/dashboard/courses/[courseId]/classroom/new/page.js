import { getLoggedUser } from "actions/auth";
import { getCourse } from "actions/course";
import { getUsers } from "actions/user";
import Error from "components/error";
import NewClassroomForm from "components/forms/newClassroom";
import { H1, SubmitButton, BackButton } from "components/utilities";

export default async function Page({ params }) {
  const authRes = await getLoggedUser();
  const courseRes = await getCourse(params.courseId);

  const isAdmin = authRes.user.role === "admin";
  const isCourseHead = courseRes.course.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );

  if (!isAdmin && !isCourseHead) {
    return (
      <Error statusCode={401} message="You are not allowed to access this" />
    );
  }

  const usersRes = await getUsers("teacher");

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Classroom</H1>
        <SubmitButton
          form="new-classroom-form"
          text="Submit"
          loadingText="Submitting"
        ></SubmitButton>
      </div>
      <NewClassroomForm course={courseRes.course} teachers={usersRes.users} />
    </>
  );
}
