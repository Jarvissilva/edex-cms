import { getCourses } from "actions/course";
import { getUser } from "actions/user";
import EditUserForm from "components/forms/editUser";
import { BackButton, H1, SubmitButton } from "components/utilities";

export default async function Page({ params }) {
  const userRes = await getUser(params.teacherId);

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">Edit Teacher</H1>
        <SubmitButton
          text="Update"
          loadingText="Updating"
          form="edit-user-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <EditUserForm user={userRes.user} />
    </>
  );
}
