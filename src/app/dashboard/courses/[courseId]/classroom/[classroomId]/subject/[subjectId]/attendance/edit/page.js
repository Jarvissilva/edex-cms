import { getAttendance } from "actions/attendance";
import { getClassroom } from "actions/classroom";
import { getSubject } from "actions/subject";
import EditAttendanceForm from "components/forms/editAttendance";
import { H1, BackButton, SubmitButton } from "components/utilities";

export default async function Page({ params }) {
  const subjectRes = await getSubject(params.subjectId);
  const classroomRes = await getClassroom(params.classroomId);
  const attendanceRes = await getAttendance(params.subjectId);

  return (
    <>
      <EditAttendanceForm
        subject={subjectRes.subject}
        classroom={classroomRes.classroom}
        attendance={attendanceRes.attendance}
      />
    </>
  );
}
