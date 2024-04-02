"use server";
import AttendanceModel from "models/attendance";
import { revalidatePath } from "next/cache";
import connectDatabase from "utilities/connectDatabase";

export async function newAttendance(subjectId, date, time, attendance) {
  try {
    await connectDatabase();

    await new AttendanceModel({
      date: date,
      time: { start: time.start, end: time.end },
      subject: subjectId,
      records: attendance,
    }).save();

    return { success: true, message: "Attendance successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function editAttendance(subjectId, attendance) {
  try {
    await connectDatabase();

    for (const updatedRecord of attendance) {
      await AttendanceModel.findByIdAndUpdate(updatedRecord._id, {
        $set: { records: updatedRecord.records },
      });
    }
    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]/subject/[subjectId]/attendance",
      "page",
    );

    return { success: true, message: "Attendance successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAttendance(subjectId) {
  try {
    await connectDatabase();

    const foundAttendance = await AttendanceModel.find({ subject: subjectId });

    if (!foundAttendance)
      return { success: false, message: "Attendance not found" };

    return JSON.parse(
      JSON.stringify({ success: true, attendance: foundAttendance }),
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
