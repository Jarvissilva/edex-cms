import { getLoggedUser } from "actions/auth";
import { getCourse } from "actions/course";
import { getUsers } from "actions/user";
import Error from "components/error";
import EditCourseForm from "components/forms/editCourse";
import { H1, BackButton, SubmitButton } from "components/utilities";

export default async function Page({ params }) {
  const courseRes = await getCourse(params.courseId);
  const usersRes = await getUsers("teacher");

  const authRes = await getLoggedUser();

  const isAdmin = authRes.user.role === "admin";
  const isCourseHead = courseRes.course.heads.find(
    (cHead) => cHead._id === authRes.user._id,
  );

  // If the user is neither an admin nor a course head, throw an unauthorized error
  if (!isAdmin && !isCourseHead) {
    return (
      <Error statusCode={401} message="You are not allowed to access this" />
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">Edit Course</H1>
        <SubmitButton
          text="Update"
          loadingText="Updating"
          form="edit-course-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <EditCourseForm course={courseRes.course} teachers={usersRes.users} />
    </>
  );
}
