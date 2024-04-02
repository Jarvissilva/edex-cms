"use client";
import { useState } from "react";
import { newAttendance } from "actions/attendance";
import { BackButton, H1 } from "components/utilities";

export default function NewAttendanceForm({ subject, classroom }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedTime, setSelectedTime] = useState({
    start: "12:00",
    end: "12:00",
  });

  const handleSubmit = async () => {
    const attendanceRes = await newAttendance(
      subject._id,
      new Date().toISOString(),
      selectedTime,
      attendanceRecords,
    );
    setAttendanceRecords([]);
    setMessage(attendanceRes.message);
  };

  const handleAttendance = (status) => {
    if (count < classroom.students.length) {
      setAttendanceRecords((prevAttendanceData) => [
        ...prevAttendanceData,
        { student: classroom.students[count]._id, status },
      ]);
      setCount(count + 1);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <H1 styles="grow">New Attendance</H1>
        <button
          onClick={() => handleSubmit()}
          className="rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500"
        >
          Submit
        </button>
      </div>
      <div>
        {message && <p className={`mt-2 text-center font-bold`}>{message}</p>}

        <div className="flex flex-col items-center justify-center gap-5 p-5">
          <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-bold">
            Attendance for {new Date().toISOString().split("T")[0]}
          </h2>
          <label htmlFor="start-time">Select lecture start & end time:</label>
          <div className="space-x-2">
            <input
              type="time"
              id="start-time"
              onChange={(e) =>
                setSelectedTime({ ...selectedTime, start: e.target.value })
              }
              className="rounded-md border border-gray-200 p-2"
            />
            <input
              type="time"
              onChange={(e) =>
                setSelectedTime({ ...selectedTime, end: e.target.value })
              }
              className="rounded-md border border-gray-200 p-2"
            />
          </div>
          {classroom.students[count] && (
            <>
              <h3 className="text-center text-[clamp(1rem,5vw,1.2rem)] font-bold leading-tight">
                Name: {classroom.students[count].student.name}
              </h3>
              <h3 className="text-center text-[clamp(1.2rem,5vw,1.2rem)] font-bold leading-tight">
                Roll Number: {classroom.students[count].roll_number}
              </h3>
              <div className="flex flex-row gap-5">
                <button
                  className="w-full rounded-md bg-blue-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-blue-600 md:w-auto"
                  onClick={() => handleAttendance("P")}
                >
                  Present
                </button>
                <button
                  className="w-full rounded-md bg-red-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-red-600 md:w-auto"
                  onClick={() => handleAttendance("A")}
                >
                  Absent
                </button>
              </div>
            </>
          )}

          <table className="w-[60%]">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3 text-center">
                  Roll Number
                </th>
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3 text-center">
                  Name
                </th>
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((attendanceRecord, index) => {
                const student = classroom.students.find(
                  (student) => student._id === attendanceRecord.student,
                );
                const rollNumber = student ? student.roll_number : "";
                const studentName = student ? student.student.name : "";

                return (
                  <tr className="text-center" key={index}>
                    <td className="whitespace-nowrap border border-gray-200 bg-white p-3">
                      {rollNumber}
                    </td>
                    <td className="whitespace-nowrap border border-gray-200 bg-white p-3">
                      {studentName}
                    </td>
                    <td className="whitespace-nowrap border border-gray-200 bg-white p-3">
                      {attendanceRecord.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex gap-4">
            <button
              onClick={() => location.reload()}
              className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-400"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
