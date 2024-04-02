"use client";
import { useFormState } from "react-dom";
import { newExam } from "actions/exam";
import { Input } from "components/utilities";

export default function NewExamForm({ classroomId }) {
  const [state, formAction] = useFormState(newExam, {
    success: false,
    message: "",
  });

  return (
    <div>
      <p
        className={`mt-2 text-center font-bold ${
          state?.success ? "text-green-500" : "text-red-500"
        }`}
      >
        {state?.message}
      </p>
      <form action={formAction} className="space-y-4" id="new-exam-form">
        <input type="hidden" name="classroom" value={classroomId} />
        <Input
          id="name"
          type="text"
          name="name"
          label="Name"
          placeholder="Enter exam name"
          required={true}
        />
      </form>
    </div>
  );
}
