"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { SelectInput } from "components/utilities";
import { getClassrooms } from "actions/classroom";
import { getSubjects } from "actions/subject";

export default function QueryTable({ teachers, courses }) {
  const [foundTeachers, setFoundTeachers] = useState(teachers);

  return (
    <div className="space-y-4">
      {foundTeachers.length > 0 ? (
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
            {foundTeachers.map((teacher, index) => (
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
  );
}
