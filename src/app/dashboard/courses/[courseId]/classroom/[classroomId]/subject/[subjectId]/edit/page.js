import { getLoggedUser } from "actions/auth";
import { getClassroom } from "actions/classroom";
import { getCourse } from "actions/course";
import { getSubject } from "actions/subject";
import { getUsers } from "actions/user";
import Error from "components/error";
import EditSubjectForm from "components/forms/editSubject";
import { H1, SubmitButton, BackButton } from "components/utilities";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const subjectRes = await getSubject(params.subjectId);
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
        <H1 styles="grow">Edit Subject</H1>
        <SubmitButton
          form="edit-subject-form"
          text="Update"
          loadingText="Updating"
        ></SubmitButton>
      </div>
      <EditSubjectForm
        courseId={params.courseId}
        subject={subjectRes.subject}
        teachers={usersRes.users}
      />
    </>
  );
}
