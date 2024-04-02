"use client";
import { useFormState } from "react-dom";
import { newSubject } from "actions/subject";
import { Input, SelectInput } from "components/utilities";

export default function NewSubjectForm({ courseId, classroom, teachers }) {
  const [state, formAction] = useFormState(newSubject, {
    success: false,
    message: "",
  });

  let teachersOptions = [];
  teachers.forEach((teacher) =>
    teachersOptions.push({ value: teacher._id, label: teacher.name }),
  );

  return (
    <div>
      <p
        className={`mt-2 text-center font-bold ${
          state?.success ? "text-green-500" : "text-red-500"
        }`}
      >
        {state?.message}
      </p>
      <form action={formAction} className="space-y-4" id="new-subject-form">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="classroom" value={classroom._id} />
        <Input
          id="nslf-name"
          type="text"
          name="name"
          label="Name"
          placeholder="Enter subject name"
          required={true}
        />

        {teachersOptions.length > 0 ? (
          <SelectInput
            isMulti
            name="teachers"
            label="Teachers"
            placeholder="Select subject teachers"
            options={teachersOptions}
          />
        ) : null}
      </form>
    </div>
  );
}
