"use client";
import { useFormState } from "react-dom";
import { newCourse } from "actions/course";
import { Input, SelectInput } from "components/utilities";

export default function NewCourseForm({ teachers }) {
  const [state, formAction] = useFormState(newCourse, {
    success: false,
    message: "",
  });

  let headsOptions = [];

  teachers.forEach((teacher) =>
    headsOptions.push({ value: teacher._id, label: teacher.name }),
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
        id="new-course-form"
        className="space-y-4"
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          placeholder="Enter course name"
          required={true}
        />
        <Input
          type="text"
          id="short-name"
          name="short_name"
          label="Short name"
          placeholder="Enter course short name"
          required={true}
        />
        <Input
          type="number"
          id="years"
          name="years"
          label="Years"
          placeholder="Enter course duration"
          required={true}
        />
        <Input
          type="number"
          id="semesters"
          name="semesters"
          label="Semesters"
          placeholder="Enter course semesters"
          required={true}
        />
        {headsOptions && (
          <SelectInput
            isMulti={true}
            name="heads"
            defaultValue={[]}
            label="Heads"
            placeholder="Select course heads"
            options={headsOptions}
          />
        )}
      </form>
    </div>
  );
}
