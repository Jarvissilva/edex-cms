import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { BackButton, LinkButton } from "components/utilities";
import { getClassroom } from "actions/classroom";
import { getSubjects } from "actions/subject";
import { MdOutlineClass } from "react-icons/md";
import { getCourse } from "actions/course";
import { getLoggedUser } from "actions/auth";
import PublishBtn from "components/publishBtn";
import { getExam, updateExamMarksPublishStatus } from "actions/exam";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const subjectsRes = await getSubjects(params.classroomId);
  const examRes = await getExam(params.examId);
  const authRes = await getLoggedUser();

  const isAdmin = authRes.user.role === "admin";
  const isStudent = authRes.user.role === "student";
  const isCourseHead = courseRes.course.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );
  const isClassroomHead = classroomRes.classroom.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="grow text-[clamp(1.5rem,5vw,2rem)] font-black">
          {examRes.exam.name} Marks
        </h1>
        {examRes.exam.isPublished ? null : (
          <PublishBtn
            exam={params.examId}
            subject={null}
            action={updateExamMarksPublishStatus}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {(authRes.user.role === "admin" || authRes.user.role === "teacher") &&
          subjectsRes.success &&
          subjectsRes.subjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center  gap-4 rounded-md border border-gray-200 p-4"
            >
              <MdOutlineClass size={30} />
              <h2>
                <Link
                  href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/exams/${params.examId}/marks/${subject._id}`}
                  className="hover:text-gray-500"
                >
                  {subject.name}
                </Link>
              </h2>
            </div>
          ))}
        {authRes.user.role === "student" && examRes.exam.isPublished ? (
          <table className="w-full">
            <thead className="text-left">
              <tr className="font-thin">
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                  Subject
                </th>
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                  Obtained Marks
                </th>
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                  Total Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {examRes.exam.marks.map((subject) => {
                return (
                  <tr>
                    <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                      {
                        subjectsRes.subjects.find(
                          (sub) => sub._id === subject.subject,
                        ).name
                      }
                    </td>
                    <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                      {
                        subject.student_marks.find(
                          (student) => student.student === authRes.user._id,
                        )?.obtained
                      }
                    </td>
                    <td className="sticky right-0 z-20 border border-gray-200 bg-white p-2">
                      {subject.total_marks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}
