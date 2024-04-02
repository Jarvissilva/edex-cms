import NewTeacherForm from "components/forms/newTeacher";
import { H1, SubmitButton, BackButton } from "components/utilities";

export default async function Page() {
  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Teacher</H1>
        <SubmitButton
          text="Submit"
          loadingText="Submitting"
          form="new-teacher-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <NewTeacherForm />
    </>
  );
}
