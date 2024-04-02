import { getClassroom } from "actions/classroom";
import { getCourses } from "actions/course";
import { getUser } from "actions/user";
import EditUserForm from "components/forms/editUser";
import { BackButton, H1, SubmitButton } from "components/utilities";

export default async function Page({ params }) {
  const userRes = await getUser(params.studentId);
  const classroomRes = await getClassroom(params.classroomId);

  const foundStudent = classroomRes.classroom.students.find(
    (cStudent) => cStudent.student._id === params.studentId,
  );
  userRes.user.roll_number = foundStudent.roll_number;
  userRes.user.classroom = params.classroomId;

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">Edit Student</H1>
        <SubmitButton
          text="Update"
          loadingText="Updating"
          form="edit-user-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <EditUserForm user={userRes.user} />
    </>
  );
}
