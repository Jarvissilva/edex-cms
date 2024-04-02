import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { BackButton, LinkButton } from "components/utilities";
import { getClassroom } from "actions/classroom";
import { getSubject } from "actions/subject";
import { getLoggedUser } from "actions/auth";
import { getCourse } from "actions/course";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomRes = await getClassroom(params.classroomId);
  const subjectRes = await getSubject(params.subjectId);
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
          {subjectRes.subject?.name}
        </h1>
        {(isAdmin || isCourseHead || isClassroomHead) && (
          <Link
            href={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${params.subjectId}/edit`}
          >
            <FaRegEdit size={30} className="hover:scale-110" />
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <LinkButton
          to={`/dashboard/courses/${params.courseId}/classroom/${params.classroomId}/subject/${params.subjectId}/attendance`}
        >
          View Attendance
        </LinkButton>
      </div>
    </>
  );
}
