"use client";
import { useFormState } from "react-dom";
import { MdOutlineEmail } from "react-icons/md";
import { loginUser } from "actions/auth";
import { SubmitButton } from "components/utilities";

export default function UserLoginForm() {
  const [state, formAction] = useFormState(loginUser, {
    success: false,
    message: "",
  });

  return (
    <form
      id="user-login-form"
      className="space-y-4 sm:px-16 lg:px-20"
      action={formAction}
    >
      <p
        className={`mt-2 text-center font-bold ${
          state?.success ? "text-green-500" : "text-red-500"
        }`}
      >
        {state?.message}
      </p>
      <div className=" flex items-center justify-start gap-4 rounded-md border border-gray-200 p-4">
        <MdOutlineEmail size={30} />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full"
          required
        />
      </div>
      <SubmitButton
        styles="w-full"
        text="Login"
        loadingText="Logging In"
        form="user-login-form"
      />
    </form>
  );
}
