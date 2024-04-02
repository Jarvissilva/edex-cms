import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { BackButton, LinkButton, SubmitButton } from "components/utilities";
import { getClassroom } from "actions/classroom";
import { getExam, saveTotalMarks, updateMarkPublishStatus } from "actions/exam";
import PublishBtn from "components/publishBtn";
import { getSubject } from "actions/subject";

export default async function Page({ params }) {
  const subjectRes = await getSubject(params.subjectId);
  const classroomRes = await getClassroom(params.classroomId);
  const examRes = await getExam(params.examId);

  const foundExamMarks = examRes.exam.marks.find(
    (em) => em.subject === params.subjectId,
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="grow text-[clamp(1.5rem,5vw,2rem)] font-black">
          {subjectRes.subject.name} Marks
        </h1>

        {foundExamMarks.isPublished ? null : (
          <>
            <PublishBtn
              exam={params.examId}
              subject={params.subjectId}
              action={updateMarkPublishStatus}
            />
          </>
        )}
      </div>
      <div className="space-y-5 overflow-x-auto p-5">
        {foundExamMarks.isPublished ? null : (
          <form
            className="flex w-full flex-col items-start justify-start gap-2"
            action={saveTotalMarks}
            id="save-total-marks"
          >
            <label
              htmlFor="total-marks"
              className="font-semibold text-gray-700"
            >
              Total marks
            </label>
            <div className="flex w-full justify-between gap-4">
              <input type="hidden" name="subject" value={params.subjectId} />
              <input type="hidden" name="exam" value={params.examId} />
              <input
                id="total-marks"
                type="number"
                min={0}
                name="total_marks"
                defaultValue={foundExamMarks?.total_marks}
                placeholder="Set total marks"
                required={true}
                className="w-full grow rounded-md border border-gray-200 px-4 py-3 outline-none"
              />
              <SubmitButton
                form="save-total-marks"
                text="Save"
                loadingText="Saving"
              />
            </div>
          </form>
        )}
        <table className="w-full">
          <thead className="text-left">
            <tr className="font-thin">
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Roll No
              </th>
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Name
              </th>
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Obtained Marks
              </th>
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Total Marks
              </th>
              <th className="sticky right-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                %
              </th>
              {foundExamMarks.isPublished ? null : (
                <th className="sticky right-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {classroomRes.classroom.students.map((student) => (
              <tr>
                <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                  {student.roll_number}
                </td>
                <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                  {student.student.name}
                </td>
                <td className="sticky right-0 z-20 border border-gray-200 bg-white p-2">
                  {
                    foundExamMarks.student_marks.find(
                      (sm) => sm.student == student.student._id,
                    )?.obtained
                  }
                </td>
                <td className="sticky right-0 z-20 border border-gray-200 bg-white p-2">
                  {foundExamMarks?.total_marks}
                </td>
                <td className="sticky right-0 z-20 border border-gray-200 bg-white p-2">
                  {(foundExamMarks.student_marks &&
                    foundExamMarks.student_marks.find(
                      (sm) => sm.student === student.student._id,
                    )?.obtained * 100) / foundExamMarks.total_marks}
                </td>
                {foundExamMarks.isPublished ? null : (
                  <td className="sticky z-20 border border-gray-200 bg-white p-2 text-center">
                    <Link
                      href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/exams/${params.examId}/marks/${params.subjectId}/edit/${student.student._id}`}
                      className="font-semibold text-blue-600 hover:text-blue-500 "
                    >
                      Edit
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
