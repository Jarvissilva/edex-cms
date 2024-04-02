import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { getCourse } from "actions/course";
import { BackButton, LinkButton } from "components/utilities";
import { getClassrooms } from "actions/classroom";
import { getLoggedUser } from "actions/auth";
import { getSubjects } from "actions/subject";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const classroomsRes = await getClassrooms(courseRes.course._id);
  const subjectsRes = await getSubjects();
  const authRes = await getLoggedUser();

  const isAdmin = authRes.user.role === "admin";
  const isCourseHead = courseRes.course.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="grow text-[clamp(1.5rem,5vw,2rem)] font-black">
          {courseRes.course?.name}
        </h1>
        {(isAdmin || isCourseHead) && (
          <>
            <Link href={`/dashboard/courses/${params.courseId}/edit`}>
              <FaRegEdit size={30} className="hover:scale-110" />
            </Link>
            <LinkButton
              to={`/dashboard/courses/${params.courseId}/classroom/new`}
            >
              New Classroom
            </LinkButton>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {classroomsRes.success &&
          classroomsRes.classrooms.map((classroom, index) => {
            if (authRes.user.role === "admin")
              return <ClassroomCard classroom={classroom} key={index} />;
            else if (isCourseHead)
              return <ClassroomCard classroom={classroom} key={index} />;
            else if (authRes.user.role === "teacher") {
              if (classroom.heads.includes(authRes.user._id))
                return <ClassroomCard classroom={classroom} key={index} />;
              else if (
                classroomsRes.classrooms
                  .find((Cclassroom) => Cclassroom._id === classroom._id)
                  .heads.includes(authRes.user._id)
              )
                return <ClassroomCard classroom={classroom} key={index} />;
            } else if (authRes.user.role === "student") {
              if (
                classroomsRes.classrooms
                  .find((Cclassroom) => Cclassroom._id === classroom._id)
                  .students.find(
                    (cStudent) => cStudent.student === authRes.user._id,
                  )
              )
                return <ClassroomCard classroom={classroom} key={index} />;
            }
          })}
      </div>
    </>
  );
}

const ClassroomCard = ({ classroom }) => {
  return (
    <>
      <div className="rounded-md border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <MdOutlineClass size={30} />
          <h2>
            <Link
              href={`/dashboard/courses/${classroom.course._id}/classroom/${classroom._id}`}
              className="hover:text-gray-500"
            >
              {classroom.name}
            </Link>
          </h2>
        </div>
        <div className="flex gap-4">
          <span>Year: {classroom.year}</span>
          <span>Semester: {classroom.semester}</span>
          <span>
            {classroom.division > 0 ? `Division: ${classroom.division}` : ""}
          </span>
        </div>
      </div>
    </>
  );
};
