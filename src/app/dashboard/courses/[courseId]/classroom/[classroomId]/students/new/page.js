import NewStudentForm from "components/forms/newStudent";
import { H1, SubmitButton, BackButton } from "components/utilities";

export default async function Page({ params }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Student</H1>
        <SubmitButton
          text="Submit"
          loadingText="Submitting"
          form="new-student-form"
          styles="!w-auto p-3 px-4"
        />
      </div>
      <NewStudentForm classroomId={params.classroomId} />
    </>
  );
}
