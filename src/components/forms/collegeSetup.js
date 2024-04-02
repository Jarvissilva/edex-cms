"use client";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { setupCollege } from "actions/college";
import { Input, SubmitButton } from "components/utilities";

export default function CollegeSetupForm() {
  const [state, formAction] = useFormState(setupCollege, {
    success: false,
    message: "",
  });
  const router = useRouter();

  return (
    <>
      {!state.success ? (
        <div className="space-y-4">
          {state?.message}
          <div className="space-y-4 text-left">
            <h1 className="text-[clamp(2rem,5vw,2.5rem)] font-black">
              Edex Setup
            </h1>
            <p className="text-[clamp(1rem,5vw,1.1rem)]">
              Easily manage your college with Edex. Our setup process ensures
              you're up and running in no time
            </p>
          </div>
          <form
            id="college-setup-form"
            className="space-y-4"
            action={formAction}
          >
            <Input
              type="text"
              id="csf-college-name"
              name="collegeName"
              label="College Name"
              required={true}
            />
            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="logo" className="font-semibold text-gray-700">
                College Logo
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                className="w-full rounded-md border p-3 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <Input
              type="text"
              id="csf-admin-name"
              name="adminName"
              label="Admin Name"
              required={true}
            />
            <Input
              type="text"
              id="csf-admin-email"
              name="adminEmail"
              label="Admin Email"
              required={true}
            />
            <SubmitButton
              text="Setup College"
              loadingText="Setting Up"
              form="college-setup-form"
            />
          </form>
        </div>
      ) : (
        <div className="space-y-4 text-left">
          <h1 className="text-[clamp(2rem,5vw,2.5rem)] font-black">
            Edex Setup Completed
          </h1>
          <p className="text-[clamp(1rem,5vw,1.1rem)]">
            Now start managing your college
          </p>
          <button
            onClick={() => router.refresh()}
            className="inline-block rounded-md border-2 border-blue-500 p-4 text-[clamp(1rem,5vw,1.1rem)] font-medium hover:border-blue-300"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
