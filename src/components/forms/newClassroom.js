"use client";
import { useFormState } from "react-dom";
import { newClassroom } from "actions/classroom";
import { Input, SelectInput } from "components/utilities";

export default function NewClassroomForm({ course, teachers }) {
  const [state, formAction] = useFormState(newClassroom, {
    success: false,
    message: "",
  });

  let years = [];
  let semesters = [];
  let heads = [];

  for (let i = 1; i <= course.years; i++) {
    years.push({ value: i, label: i.toString() });
  }
  for (let i = 1; i <= course.semesters; i++) {
    semesters.push({ value: i, label: i.toString() });
  }

  teachers.forEach((teacher) =>
    heads.push({ value: teacher._id, label: teacher.name }),
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
      <form
        action={async (formData) => {
          await formAction(formData);
        }}
        className="space-y-4"
        id="new-classroom-form"
      >
        <input type="hidden" name="course" value={course._id} />
        <Input
          id="name"
          type="text"
          name="name"
          label="Name"
          placeholder="Enter classroom name"
          required={true}
        />
        <SelectInput
          name="year"
          label="Year"
          placeholder="Select course year"
          options={years}
          required={true}
        />
        <SelectInput
          name="semester"
          label="Semester"
          placeholder="Select course semester"
          options={semesters}
          required={true}
        />
        {heads.length > 0 ? (
          <SelectInput
            isMulti
            name="heads"
            label="Heads"
            placeholder="Select classroom head"
            options={heads}
          />
        ) : null}
      </form>
    </div>
  );
}
