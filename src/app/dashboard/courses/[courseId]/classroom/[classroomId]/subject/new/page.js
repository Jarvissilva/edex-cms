import { getLoggedUser } from "actions/auth";
import { getClassroom } from "actions/classroom";
import { getCourse } from "actions/course";
import { getUsers } from "actions/user";
import Error from "components/error";
import NewSubjectForm from "components/forms/newSubject";
import { H1, SubmitButton, BackButton } from "components/utilities";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const usersRes = await getUsers("teacher");
  const authRes = await getLoggedUser();

  const isAdmin = authRes.user.role === "admin";
  const isCourseHead = courseRes.course.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );
  const isClassroomHead = classroomRes.classroom.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );

  if (!isAdmin && !isCourseHead && !isClassroomHead) {
    return (
      <Error statusCode={401} message="You are not allowed to access this" />
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Subject</H1>
        <SubmitButton
          form="new-subject-form"
          text="Submit"
          loadingText="Submitting"
        ></SubmitButton>
      </div>
      <NewSubjectForm
        courseId={params.courseId}
        classroom={classroomRes.classroom}
        teachers={usersRes.users}
      />
    </>
  );
}
