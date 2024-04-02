"use client";
import { useState } from "react";
import { editAttendance } from "actions/attendance";
import { BackButton, H1 } from "components/utilities";

export default function EditAttendanceForm({ subject, classroom, attendance }) {
  const [attendances, setAttendances] = useState(attendance);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const attendanceRes = await editAttendance(subject._id, attendances);
    setMessage(attendanceRes.message);
  };

  const formatDate = (date) => {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCellClick = (studentId, date) => {
    const updatedAttendances = attendances.map((attendance) => {
      if (attendance.date === date) {
        const updatedRecords = attendance.records.map((record) => {
          if (record.student === studentId) {
            return {
              ...record,
              status: record.status === "P" ? "A" : "P",
            };
          }
          return record;
        });
        return {
          ...attendance,
          records: updatedRecords,
        };
      }
      return attendance;
    });

    setAttendances(updatedAttendances);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">Edit Attendance</H1>
        <button
          className="w-auto rounded-md bg-blue-600 p-3 px-4 font-semibold text-white hover:bg-blue-500"
          onClick={() => handleSubmit()}
        >
          Update
        </button>
      </div>
      <div className="overflow-x-auto p-5">
        {message && <p className={`my-2 text-center font-bold`}>{message}</p>}
        <table className="w-full">
          <thead className="text-left">
            <tr className="font-thin">
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Roll No
              </th>
              <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                Name
              </th>
              {attendance.length > 0 &&
                attendance.map((attendance, index) => (
                  <th
                    key={index}
                    className="flex-col whitespace-nowrap border border-gray-200 p-3"
                  >
                    <span className="flex flex-col">
                      <span>{formatDate(attendance.date)}</span>
                      {attendance.time &&
                        " (" +
                          attendance.time.start +
                          "-" +
                          attendance.time.end +
                          ")"}
                    </span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {classroom && classroom.students
              ? classroom.students.map((student) => {
                  const presentCount = {};
                  let totalAttendance = 0;

                  attendance.forEach((attendance) => {
                    attendance.records.forEach((record) => {
                      if (
                        record.student === student._id &&
                        record.status === "P"
                      ) {
                        if (!presentCount[attendance.date]) {
                          presentCount[attendance.date] = "P";
                        }
                        totalAttendance++;
                      } else if (
                        record.student === student._id &&
                        record.status === "A"
                      ) {
                        if (!presentCount[attendance.date]) {
                          presentCount[attendance.date] = "A";
                        }
                        totalAttendance++;
                      }
                    });
                  });

                  const attendanceDates = Object.keys(presentCount);
                  const presentPercentage =
                    (totalAttendance / attendanceDates.length) * 100 || 0;

                  return (
                    <tr key={student.student._id}>
                      <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                        {student.roll_number}
                      </td>
                      <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                        {student.student.name}
                      </td>
                      {attendances.map((record, index) => (
                        <td
                          key={index}
                          className={`cursor-pointer border border-gray-200 p-2 ${
                            record.records.find(
                              (rec) => rec.student === student._id,
                            )?.status === "P"
                              ? "bg-blue-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                          onClick={() =>
                            handleCellClick(student._id, record.date)
                          }
                        >
                          {record.records.find(
                            (rec) => rec.student === student._id,
                          )?.status || "-"}
                        </td>
                      ))}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
