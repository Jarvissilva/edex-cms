"use client";
import { useFormState } from "react-dom";
import { newUser } from "actions/user";
import { Input, SelectInput } from "components/utilities";
import { useRef, useState } from "react";
import { getClassrooms } from "actions/classroom";

export default function NewStudentForm({ classroomId }) {
  const [state, formAction] = useFormState(newUser, {
    success: false,
    message: "",
  });
  const formRef = useRef();

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
        id="new-student-form"
        ref={formRef}
        action={async (formData) => {
          await formAction(formData);
          if (state.success) formRef.current.reset();
        }}
        className="space-y-4"
      >
        <input type="hidden" name="classroom" value={classroomId} />
        <input type="hidden" name="role" value="student" />
        <Input
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="Enter student name"
          required={true}
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Enter student email"
          required={true}
        />
        <Input
          type="text"
          name="roll_number"
          id="roll-number"
          label="Roll Number"
          placeholder="Enter student roll number"
          required={true}
        />
      </form>
    </div>
  );
}
