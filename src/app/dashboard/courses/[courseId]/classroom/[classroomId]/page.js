import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { BackButton, LinkButton } from "components/utilities";
import { getClassroom } from "actions/classroom";
import { getSubjects } from "actions/subject";
import { MdOutlineClass } from "react-icons/md";
import { getCourse } from "actions/course";
import { getLoggedUser } from "actions/auth";
import { getExams } from "actions/exam";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const subjectRes = await getSubjects(params.classroomId);
  const examsRes = await getExams(params.classroomId);
  const authRes = await getLoggedUser();

  const isAdmin = authRes.user.role === "admin";
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
          {classroomRes.classroom?.name}
        </h1>
        {(isAdmin || isCourseHead) && (
          <>
            <Link
              href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/edit`}
            >
              <FaRegEdit size={30} className="hover:scale-110" />
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Subjects</h2>
          {(isAdmin || isCourseHead || isClassroomHead) && (
            <>
              <LinkButton
                to={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/new`}
                styles="!py-3"
              >
                New Subject
              </LinkButton>
            </>
          )}
        </div>
        {subjectRes.success &&
          subjectRes.subjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-4"
            >
              <div className="flex items-center gap-4">
                <MdOutlineClass size={30} />
                <h2>{subject.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${subject._id}/attendance`}
                  className="text-blue-600 hover:text-blue-400"
                >
                  View Attendance
                </Link>
                {(authRes.success && authRes.user.role === "admin") ||
                authRes.user.role === "teacher" ? (
                  <Link
                    href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${subject._id}/edit`}
                  >
                    <FaRegEdit size={30} className="hover:scale-110" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Exams</h2>
          {authRes.user.role === "student" ? null : (
            <LinkButton
              to={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/exams/new`}
              styles="!py-3"
            >
              New Exam
            </LinkButton>
          )}
        </div>
        {examsRes.success
          ? examsRes.exams.map((exam, index) => {
              if (
                authRes.user.role === "admin" ||
                authRes.user.role === "teacher"
              )
                return <ExamCard exam={exam} params={params} key={index} />;
              else if (authRes.user.role === "student" && exam.isPublished)
                return <ExamCard exam={exam} params={params} key={index} />;
            })
          : "No exams found"}
      </div>
    </>
  );
}

const ExamCard = ({ exam, params }) => {
  return (
    <div className="flex items-center  gap-4 rounded-md border border-gray-200 p-4">
      <MdOutlineClass size={30} />
      <h2>
        <Link
          href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/exams/${exam._id}/marks`}
          className="hover:text-gray-500"
        >
          {exam.name}
        </Link>
      </h2>
    </div>
  );
};
