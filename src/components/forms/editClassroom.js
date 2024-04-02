"use client";
import { useFormState } from "react-dom";
import { editClassroom } from "actions/classroom";
import { Input, LinkButton, SelectInput } from "components/utilities";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

export default function EditClassroomForm({ classroom, course, teachers }) {
  const [state, formAction] = useFormState(editClassroom, {
    success: false,
    message: "",
  });

  let years = [];
  let semesters = [];
  let heads = [];

  for (let i = 1; i <= course.duration; i++) {
    years.push({ value: i, label: i.toString() });
  }
  for (let i = 1; i <= course.semesters; i++) {
    semesters.push({ value: i, label: i.toString() });
  }
  teachers.forEach((teacher) =>
    heads.push({ value: teacher._id, label: teacher.name }),
  );

  let defaultHeads = [];

  classroom.heads.forEach((head) =>
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
      <form action={formAction} className="space-y-4" id="edit-classroom-form">
        <input type="hidden" name="course" value={classroom.course} />
        <input type="hidden" name="id" value={classroom._id} />
        <Input
          id="nclf-name"
          type="text"
          name="name"
          label="Name"
          placeholder="Enter classroom name"
          defaultValue={classroom.name}
          required={true}
        />
        <SelectInput
          name="year"
          label="Year"
          placeholder="Select course year"
          defaultValue={{ value: classroom.year, label: classroom.year }}
          options={years}
        />
        <SelectInput
          name="semester"
          label="Semester"
          placeholder="Select course semester"
          options={semesters}
          defaultValue={{
            value: classroom.semester,
            label: classroom.semester,
          }}
        />
        <SelectInput
          isMulti
          name="heads"
          label="Heads"
          placeholder="Select classroom head"
          defaultValue={defaultHeads}
          options={heads}
        />
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Students</h2>
          <LinkButton
            styles="py-2"
            to={`/dashboard/courses/${course._id}/classroom/${classroom._id}/students/new`}
          >
            Add Student
          </LinkButton>
        </div>
        <table className="w-full">
          <thead className="border-t border-gray-200 text-left">
            <tr>
              <th className="whitespace-nowrap border-b border-gray-200 bg-white p-3">
                Roll Number
              </th>
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
            {classroom.students.map((student, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 bg-white p-3">
                  {student.roll_number}
                </td>
                <td className="border-b border-gray-200 bg-white p-3">
                  {student.student.name}
                </td>
                <td className="border-b border-gray-200 bg-white p-3">
                  {student.student.email}
                </td>

                <td className="flex items-center justify-end gap-4 border-b border-gray-200 bg-white p-3">
                  <Link
                    href={`/dashboard/courses/${course._id}/classroom/${classroom._id}/students/edit/${student.student._id}`}
                  >
                    <FaRegEdit size={30} className="hover:scale-110" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
