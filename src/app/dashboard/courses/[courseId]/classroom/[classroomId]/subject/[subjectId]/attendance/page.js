import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { BackButton, LinkButton } from "components/utilities";
import { getAttendance } from "actions/attendance";
import { getClassroom } from "actions/classroom";
import { getSubject } from "actions/subject";
import { getLoggedUser } from "actions/auth";

export default async function Page({ params }) {
  const subjectRes = await getSubject(params.subjectId);
  const attendanceRes = await getAttendance(params.subjectId);
  const classroomRes = await getClassroom(params.classroomId);
  const authRes = await getLoggedUser();

  const formatDate = (date) => {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="grow text-[clamp(1.5rem,5vw,2rem)] font-black">
          {subjectRes.subject.name} Attendance
        </h1>
        {(authRes.success && authRes.user.role === "admin") ||
        authRes.user.role === "teacher" ? (
          <>
            <Link
              href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${params.subjectId}/attendance/edit`}
            >
              <FaRegEdit size={30} className="hover:scale-110" />
            </Link>
            <LinkButton
              to={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${params.subjectId}/attendance/new`}
            >
              New Attendance
            </LinkButton>
          </>
        ) : null}
      </div>
      <div className="overflow-x-auto p-5">
        <table className="w-full">
          <thead className="text-left">
            <tr className="font-thin">
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Roll No
              </th>
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Name
              </th>
              {attendanceRes &&
                attendanceRes.attendance.length > 0 &&
                attendanceRes.attendance.map((attendance, index) => (
                  <th
                    key={index}
                    className="flex-col whitespace-nowrap border border-gray-200 p-3"
                  >
                    <span className="flex flex-col">
                      <span>{formatDate(attendance.date)}</span>
                      {attendance.time &&
                        " (" +
                          attendance.time.start +
                          "-" +
                          attendance.time.end +
                          ")"}
                    </span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {classroomRes &&
              classroomRes.classroom &&
              classroomRes.classroom.students.map((student) => {
                // Check if the user is a student
                if (
                  authRes.user.role === "student" &&
                  student.student._id !== authRes.user._id
                ) {
                  return null; // Skip displaying attendance for other students
                }

                const attendanceCounts = {};

                // Calculate attendance counts for the current student
                attendanceRes.attendance.forEach((attendance) => {
                  attendance.records.forEach((record) => {
                    if (record.student === student.student._id) {
                      if (!attendanceCounts[attendance.date]) {
                        attendanceCounts[attendance.date] = {
                          present: 0,
                          total: 0,
                        };
                      }
                      // Increment the appropriate count based on the status
                      if (record.status === "P") {
                        attendanceCounts[attendance.date].present++;
                      }
                      attendanceCounts[attendance.date].total++;
                    }
                  });
                });

                const presentPercentage = Object.values(
                  attendanceCounts,
                ).reduce(
                  (acc, count) => acc + (count.present / count.total) * 100,
                  0,
                );

                return (
                  <tr key={student._id}>
                    <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                      {student.roll_number}
                    </td>
                    <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                      {student.student.name}
                    </td>
                    {attendanceRes &&
                      attendanceRes.attendance.length > 0 &&
                      attendanceRes.attendance.map((attendance, index) => (
                        <td key={index} className="border border-gray-200 p-2">
                          {attendance.records.find(
                            (record) => record.student === student._id,
                          )
                            ? attendance.records.find(
                                (record) => record.student === student._id,
                              ).status
                            : "-"}
                        </td>
                      ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
