import { getClassroom } from "actions/classroom";
import { getSubject } from "actions/subject";
import NewAttendanceForm from "components/forms/newAttendance";
import { BackButton, H1 } from "components/utilities";

export default async function Page({ params }) {
  const subjectRes = await getSubject(params.subjectId);
  const classroomRes = await getClassroom(params.classroomId);

  return (
    <>
      <NewAttendanceForm
        subject={subjectRes.subject}
        classroom={classroomRes.classroom}
      />
    </>
  );
}
