"use server";
import { revalidatePath } from "next/cache";
import connectDatabase from "utilities/connectDatabase";
import ClassroomModel from "models/classroom";

export async function newClassroom(_, formData) {
  try {
    await connectDatabase();

    const foundClassrooms = await ClassroomModel.find({
      course: formData.get("course"),
      year: formData.get("year"),
    });

    await new ClassroomModel({
      course: formData.get("course"),
      name: formData.get("name"),
      year: parseInt(formData.get("year")),
      semester: parseInt(formData.get("semester")),
      division: foundClassrooms.length < 0 ? 1 : foundClassrooms.length,
      heads: formData.getAll("heads"),
    }).save();

    revalidatePath("/dashboard/courses/[course]", "page");

    return { success: true, message: "Classroom successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function editClassroom(_, formData) {
  try {
    await connectDatabase();

    const updatedClassroom = await ClassroomModel.findByIdAndUpdate(
      formData.get("id"),
      {
        course: formData.get("course"),
        name: formData.get("name"),
        year: parseInt(formData.get("year")),
        semester: parseInt(formData.get("semester")),
        subjects: formData
          .getAll("subjects")
          .map((subject) => ({ name: subject })),
        heads: formData.getAll("heads"),
      },
      { new: true },
    );

    if (!updatedClassroom) {
      return { success: false, message: "Course could not be updated" };
    }

    revalidatePath("/dashboard/courses/[course]", "page");

    return { success: true, message: "Course successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAllClassrooms() {
  try {
    await connectDatabase();

    const foundClassrooms = await ClassroomModel.find().populate("course");

    if (!foundClassrooms[0])
      return { success: false, message: "Classrooms not found" };

    return JSON.parse(
      JSON.stringify({ success: true, classrooms: foundClassrooms }),
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getClassrooms(courseId) {
  try {
    await connectDatabase();

    const foundClassrooms = await ClassroomModel.find({
      course: courseId,
    }).populate("course");

    if (!foundClassrooms[0])
      return { success: false, message: "Classrooms not found" };

    return JSON.parse(
      JSON.stringify({ success: true, classrooms: foundClassrooms }),
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getClassroom(id) {
  try {
    await connectDatabase();

    const foundClassroom = await ClassroomModel.findOne({ _id: id }).populate([
      "heads",
      "students.student",
    ]);

    if (!foundClassroom)
      return { success: false, message: "Classroom not found" };

    return JSON.parse(
      JSON.stringify({ success: true, classroom: foundClassroom }),
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
}
