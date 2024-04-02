"use server";
import connectDatabase from "utilities/connectDatabase";
import SubjectModel from "models/subject";
import { revalidatePath } from "next/cache";

export async function newSubject(_, formData) {
  try {
    await connectDatabase();

    const newSubject = await new SubjectModel({
      classroom: formData.get("classroom"),
      name: formData.get("name"),
      teachers: formData.getAll("teachers"),
    }).save();

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]",
      "page",
    );

    return { success: true, message: "Subject successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function editSubject(_, formData) {
  try {
    await connectDatabase();

    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      formData.get("id"),
      {
        name: formData.get("name"),
        teachers: formData.getAll("teachers"),
      },
      { new: true },
    );

    if (!updatedSubject) {
      return { success: false, message: "Subject could not be updated" };
    }

    revalidatePath(
      "/dashboard/courses/[courseId]/classroom/[classroomId]",
      "page",
    );

    return { success: true, message: "Subject successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAllSubjects() {
  try {
    await connectDatabase();

    const foundSubjects = await SubjectModel.find().populate("classroom");

    if (!foundSubjects[0])
      return { success: false, message: "Subjects not found", subjects: [] };

    return JSON.parse(
      JSON.stringify({ success: true, subjects: foundSubjects }),
    );
  } catch (error) {
    return { success: false, message: error.message, subjects: [] };
  }
}
export async function getSubjects(classroomId) {
  try {
    await connectDatabase();

    const foundSubjects = await SubjectModel.find({
      classroom: classroomId,
    });

    if (!foundSubjects[0])
      return { success: false, message: "Subjects not found", subjects: [] };

    return JSON.parse(
      JSON.stringify({ success: true, subjects: foundSubjects }),
    );
  } catch (error) {
    return { success: false, message: error.message, subjects: [] };
  }
}
export async function getSubjectsByTeacher(teacherId) {
  try {
    await connectDatabase();
    const foundTeacherSubjects = await SubjectModel.find({
      teachers: teacherId,
    }).populate("classroom");

    if (!foundTeacherSubjects[0])
      return {
        success: false,
        message: "Teacher is not teaching any subjects",
      };

    return JSON.parse(
      JSON.stringify({ success: true, subjects: foundTeacherSubjects }),
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getSubject(id) {
  try {
    await connectDatabase();

    const foundSubject = await SubjectModel.findOne({ _id: id }).populate(
      "teachers",
    );

    if (!foundSubject) return { success: false, message: "Subject not found" };

    return JSON.parse(JSON.stringify({ success: true, subject: foundSubject }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
