import { getUsers } from "actions/user";
import { H1, LinkButton } from "components/utilities";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

export default async function Page() {
  const usersRes = await getUsers("teacher");

  return (
    <>
      <div className="flex items-center justify-between">
        <H1>Teachers</H1>
        <LinkButton to="/dashboard/teachers/new">New Teacher</LinkButton>
      </div>
      <div className="space-y-4">
        {usersRes.users.length > 0 ? (
          <table className="w-full">
            <thead className="border-t border-gray-200 text-left">
              <tr>
                <th className="whitespace-nowrap border-b border-gray-200 bg-white p-3">
                  Name
                </th>
                <th className="whitespace-nowrap border-b border-gray-200 bg-white p-3">
                  Email
                </th>
                <th className="whitespace-nowrap border-b border-gray-200 bg-white p-3"></th>
              </tr>
            </thead>
            <tbody>
              {usersRes.users.map((teacher, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200 bg-white p-3">
                    {teacher.name}
                  </td>
                  <td className="border-b border-gray-200 bg-white p-3">
                    {teacher.email}
                  </td>
                  <td className="flex items-center justify-end gap-4 border-b border-gray-200 bg-white p-3">
                    <Link href={`/dashboard/teachers/edit/${teacher._id}`}>
                      <FaRegEdit size={30} className="hover:scale-110" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-10 text-center">Teachers not found</p>
        )}
      </div>
    </>
  );
}
