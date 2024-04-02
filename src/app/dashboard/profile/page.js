import { getLoggedUser } from "actions/auth";
import Logout from "components/logoutBtn";
import { H1 } from "components/utilities";

export default async function Page() {
  const authRes = await getLoggedUser();

  return (
    <>
      {authRes.success && (
        <>
          <div className="flex items-center justify-between">
            <H1>Profile</H1>
            <Logout />
          </div>
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-800">Name</p>
            <div className="rounded-md border p-4">{authRes.user.name}</div>
          </div>
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-800">Email</p>
            <div className="rounded-md border p-4">{authRes.user.email}</div>
          </div>
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-800">Role</p>
            <div className="rounded-md border p-4">{authRes.user?.role}</div>
          </div>
        </>
      )}
    </>
  );
}
