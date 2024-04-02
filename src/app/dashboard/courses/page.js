import Link from "next/link";
import { MdOutlineSchool } from "react-icons/md";
import { getCourses } from "actions/course";
import { getAllClassrooms } from "actions/classroom";
import { getAllSubjects } from "actions/subject";
import { H1, LinkButton } from "components/utilities";
import { getLoggedUser } from "actions/auth";

export default async function Page() {
  const authRes = await getLoggedUser();
  const coursesRes = await getCourses();
  const classroomsRes = await getAllClassrooms();
  const subjectsRes = await getAllSubjects();

  return (
    <>
      <div className="flex items-center justify-between">
        <H1>Courses</H1>
        {authRes.success && authRes.user.role === "admin" ? (
          <LinkButton to="/dashboard/courses/new">New Course</LinkButton>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-4">
        {authRes.success && coursesRes.success ? (
          coursesRes.courses.map((course, index) => {
            if (authRes.user.role === "admin") {
              return <CourseCard course={course} />;
            } else if (authRes.user.role === "teacher") {
              if (course.heads.includes(authRes.user._id))
                return <CourseCard course={course} />;
              else if (
                classroomsRes.classrooms
                  .find((classroom) => classroom.course._id === course._id)
                  .heads.includes(authRes.user._id)
              )
                return <CourseCard course={course} />;
              else if (
                subjectsRes.subjects
                  .find((subject) => subject.classroom.course === course._id)
                  .teachers.includes(authRes.user._id)
              )
                return <CourseCard course={course} />;
            } else if (authRes.user.role === "student") {
              if (
                classroomsRes.classrooms
                  .find((classroom) => classroom.course._id === course._id)
                  .students.find(
                    (cStudent) => cStudent.student === authRes.user._id,
                  )
              )
                return <CourseCard course={course} />;
            }
          })
        ) : (
          <div className="my-10 flex w-full items-center justify-center">
            {authRes.message}
          </div>
        )}
      </div>
    </>
  );
}

const CourseCard = ({ course }) => {
  return (
    <div
      key={course._id}
      className="flex w-full items-center gap-4 rounded-md border border-gray-200 p-4"
    >
      <MdOutlineSchool size={40} />
      <h2>
        <Link
          href={`/dashboard/courses/${course?._id}`}
          className="text-lg hover:text-gray-500"
        >
          {course.name}
        </Link>
      </h2>
    </div>
  );
};
