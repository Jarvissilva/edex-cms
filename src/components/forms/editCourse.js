"use client";
import { useFormState } from "react-dom";
import { editCourse } from "actions/course";
import { Input, SelectInput } from "components/utilities";

export default function EditCourseForm({ course, teachers }) {
  const [state, formAction] = useFormState(editCourse, {
    success: false,
    message: "",
  });

  let heads = [];

  teachers.forEach((teacher) =>
    heads.push({ value: teacher._id, label: teacher.name }),
  );

  let defaultHeads = [];
  course.heads.forEach((head) =>
    defaultHeads.push({ value: head._id, label: head.name }),
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
      <form id="edit-course-form" className="space-y-4" action={formAction}>
        <input type="hidden" name="id" value={course._id} />
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          placeholder="Enter course name"
          defaultValue={course.name}
          required={true}
        />
        <Input
          type="text"
          id="short-name"
          name="short_name"
          label="Short name"
          placeholder="Enter course short name"
          defaultValue={course.short_name}
          required={true}
        />
        <Input
          type="number"
          id="years"
          name="years"
          label="Years"
          placeholder="Enter course years"
          defaultValue={course.years}
          required={true}
        />
        <Input
          type="number"
          id="semesters"
          name="semesters"
          label="Semesters"
          placeholder="Enter course semesters"
          defaultValue={course.semesters}
          required={true}
        />

        <SelectInput
          isMulti={true}
          name="heads"
          label="Heads"
          placeholder="Select course heads"
          options={heads}
          defaultValue={defaultHeads}
          required={true}
        />
      </form>
    </div>
  );
}
