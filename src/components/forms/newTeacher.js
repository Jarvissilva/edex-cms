"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { newUser } from "actions/user";
import { Input } from "components/utilities";

export default function NewTeacheForm() {
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
        ref={formRef}
        id="new-teacher-form"
        action={async (formData) => {
          await formAction(formData);
          formRef.current.reset();
        }}
        className="space-y-4"
      >
        <input type="hidden" name="role" value="teacher" />
        <Input
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="Enter teacher name"
          required={true}
        />
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Enter teacher email"
          required={true}
        />
      </form>
    </div>
  );
}
