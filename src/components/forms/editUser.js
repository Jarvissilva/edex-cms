"use client";
import { useFormState } from "react-dom";
import { editUser } from "actions/user";
import { Input } from "components/utilities";

export default function EditUserForm({ user }) {
  const [state, formAction] = useFormState(editUser, {
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
      <form id="edit-user-form" action={formAction} className="space-y-4">
        <input type="hidden" name="role" value={user.role} />
        <input type="hidden" name="id" value={user._id} />
        <Input
          type="text"
          name="name"
          id="name"
          label="Name"
          defaultValue={user.name}
          placeholder={`Enter ${user.role} name`}
          required={true}
        />
        <Input
          type="email"
          name="email"
          id="email"
          defaultValue={user.email}
          label="Email"
          placeholder={`Enter ${user.role} email`}
          required={true}
        />
        {user.role === "student" && (
          <>
            <Input
              type="text"
              name="roll_number"
              id="roll-number"
              defaultValue={user.roll_number}
              label="Roll Number"
              placeholder={`Enter ${user.role} roll number`}
              required={true}
            />
            <input type="hidden" name="classroom" value={user.classroom} />
          </>
        )}
      </form>
    </div>
  );
}
