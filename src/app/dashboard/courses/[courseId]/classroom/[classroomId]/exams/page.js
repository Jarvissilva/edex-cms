import Link from "next/link";
import { BackButton, LinkButton } from "components/utilities";
import { getClassroom } from "actions/classroom";
import { getSubject } from "actions/subject";
import { getLoggedUser } from "actions/auth";
import { getCourse } from "actions/course";
import { getExams } from "actions/exam";
import { MdOutlineClass } from "react-icons/md";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const subjectRes = await getSubject(params.subjectId);
  const examsRes = await getExams(params.classroomId);
  const authRes = await getLoggedUser();
  console.log("dfds", examsRes);
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
        <h1 className="grow text-[clamp(1.5rem,5vw,2rem)] font-black">Exams</h1>
        {authRes.user.role === "student" ? null : (
          <LinkButton
            to={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/exams/new`}
          >
            New Exam
          </LinkButton>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {examsRes.success &&
          examsRes.exams.map((exam, index) => {
            if (
              authRes.user.role === "admin" ||
              authRes.user.role === "teacher"
            )
              return <ExamCard exam={exam} params={params} key={index} />;
            else if (authRes.user.role === "student" && exam.isPublished)
              return <ExamCard exam={exam} params={params} key={index} />;
          })}
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
