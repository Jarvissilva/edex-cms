"use client";
import { useFormState } from "react-dom";
import { editMarks } from "actions/exam";
import { Input } from "components/utilities";

export default function EditMarksForm({
  examId,
  subjectId,
  studentId,
  studentMarks,
}) {
  const [state, formAction] = useFormState(editMarks, {
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
      <form id="edit-marks-form" action={formAction} className="space-y-4">
        <input type="hidden" name="exam" value={examId} />
        <input type="hidden" name="subject" value={subjectId} />
        <input type="hidden" name="student" value={studentId} />
        <Input
          type="number"
          name="obtained_marks"
          id="obtained-marks"
          label="Obtained Marks"
          defaultValue={studentMarks}
          required={true}
          disabled={true}
        />
      </form>
    </div>
  );
}
