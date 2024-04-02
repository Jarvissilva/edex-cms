"use client";
import { useFormState } from "react-dom";
import { editSubject } from "actions/subject";
import { Input, SelectInput } from "components/utilities";

export default function EditSubjectForm({ courseId, subject, teachers }) {
  const [state, formAction] = useFormState(editSubject, {
    success: false,
    message: "",
  });

  let teachersOptions = [];
  teachers.forEach((teacher) =>
    teachersOptions.push({ value: teacher._id, label: teacher.name }),
  );

  let defaultTeachers = [];
  subject.teachers.forEach((teacher) =>
    defaultTeachers.push({ value: teacher._id, label: teacher.name }),
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
      <form action={formAction} className="space-y-4" id="edit-subject-form">
        <input type="hidden" name="id" value={subject._id} />
        <input type="hidden" name="courseId" value={courseId} />
        <Input
          id="nslf-name"
          type="text"
          name="name"
          label="Name"
          defaultValue={subject.name}
          placeholder="Enter subject name"
          required={true}
        />

        {teachersOptions.length > 0 ? (
          <SelectInput
            isMulti
            name="teachers"
            label="Teachers"
            defaultValue={defaultTeachers}
            placeholder="Select subject teachers"
            options={teachersOptions}
          />
        ) : null}
      </form>
    </div>
  );
}
