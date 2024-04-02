"use client";
import { useState } from "react";
import { Input, SelectInput } from "components/utilities";
import { getClassrooms } from "actions/classroom";
import { getSubject, getSubjects } from "actions/subject";

export default function AttendanceTable({ courses }) {
  const [attendance, setAttendance] = useState([]);
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const handleCourseChange = async (e) => {
    if (e) {
      const classroomsRes = await getClassrooms(e.value);
      setClassroomOptions(
        classroomsRes.classrooms.map((classroom) => ({
          value: classroom._id,
          label: classroom.name,
        })),
      );
    }
  };

  const handleClassroomChange = async (e) => {
    if (e) {
      const subjectsRes = await getSubjects(e.value);
      setSubjectOptions(
        subjectsRes.subjects.map((subject) => ({
          value: subject._id,
          label: subject.name,
        })),
      );
    }
  };

  const handleSubjectChange = async (e) => {
    if (e) {
      const subjectRes = await getSubject(e.value);
      setAttendance(subjectRes.subject.attendance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-evenly gap-4">
        <SelectInput
          name="course"
          placeholder="Select a course"
          options={courses.map((course) => ({
            value: course._id,
            label: course.name,
          }))}
          onChange={(e) => handleCourseChange(e)}
          required={true}
        />
        <SelectInput
          name="classroom"
          placeholder="Select a classroom"
          options={classroomOptions}
          onChange={(e) => handleClassroomChange(e)}
          required={true}
        />
        <SelectInput
          name="subject"
          placeholder="Select a subject"
          options={subjectOptions}
          onChange={(e) => handleSubjectChange(e)}
          required={true}
        />
        {/* <Input
          type="text"
          name="date"
          id="date"
          placeholder="Select a date"
          onFocus={(e) => (e.target.type = "date")}
          required={true}
        /> */}
      </div>
      {attendance && attendance.length > 0 ? (
        <div>
          <table className="w-full">
            <thead className="text-left">
              <tr className="font-thin">
                <th className="sticky left-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                  Roll Number
                </th>
                {attendance.map((record) => (
                  <th
                    key={record.date}
                    className="whitespace-nowrap border border-gray-200 p-3"
                  >
                    {formatDate(record.date)}
                  </th>
                ))}
                <th className="sticky right-0 z-20 whitespace-nowrap border border-gray-200 bg-white p-3">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {classroom.students.map((student) => {
                const totalDates = classroom.attendances.length;
                let presentCount = 0;
                classroom.attendances.forEach((attendance) => {
                  const studentAttendance = attendance.attendance.find(
                    (record) => record.studentId === student._id,
                  );
                  if (studentAttendance) {
                    if (studentAttendance.status === "P") {
                      presentCount++;
                    }
                  }
                });

                const totalAttendance =
                  presentCount + (totalDates - presentCount);
                const presentPercentage =
                  (presentCount / totalAttendance) * 100 || 0;

                return (
                  <tr key={student.rollNumber}>
                    <td className="sticky left-0 z-20 border border-gray-200 bg-white p-2">
                      {student.rollNumber}
                    </td>
                    {classroom.attendances.map((attendance) => {
                      const studentAttendance = attendance.attendance.find(
                        (record) => record.studentId === student._id,
                      );
                      return (
                        <td
                          key={attendance.date}
                          className="border border-gray-200 p-2"
                        >
                          {studentAttendance ? studentAttendance.status : "-"}
                        </td>
                      );
                    })}
                    <td className="sticky right-0 z-20 border border-gray-200 bg-white p-2">
                      {presentCount} / {totalAttendance} (
                      {presentPercentage.toFixed(2)}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
