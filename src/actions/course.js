"use server";
import { revalidatePath } from "next/cache";
import connectDatabase from "utilities/connectDatabase";
import CourseModel from "models/course";

export async function newCourse(_, formData) {
  try {
    await connectDatabase();

    await new CourseModel({
      name: formData.get("name"),
      short_name: formData.get("short_name"),
      years: formData.get("years"),
      semesters: formData.get("semesters"),
      heads: formData.getAll("heads"),
    }).save();

    revalidatePath("/dashboard/courses", "page");

    return { success: true, message: "Course successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function editCourse(_, formData) {
  try {
    await connectDatabase();

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      formData.get("id"),
      {
        name: formData.get("name"),
        short_name: formData.get("short_name"),
        duration: formData.get("duration"),
        semesters: formData.get("semesters"),
        heads: formData.getAll("heads"),
      },
      { new: true },
    );

    if (!updatedCourse) {
      return { success: false, message: "Course could not be updated" };
    }

    revalidatePath("/dashboard/courses", "page");

    return { success: true, message: "Course successfully updated" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getCourses() {
  try {
    await connectDatabase();

    const foundCourses = await CourseModel.find();

    if (!foundCourses[0])
      return { success: false, message: "Courses not found", courses: [] };

    return JSON.parse(JSON.stringify({ success: true, courses: foundCourses }));
  } catch (error) {
    return { success: false, message: error.message, courses: [] };
  }
}
export async function getCourse(id) {
  try {
    await connectDatabase();

    const foundCourse = await CourseModel.findOne({ _id: id }).populate(
      "heads",
    );

    if (!foundCourse) return { success: false, message: "Course not found" };

    return JSON.parse(JSON.stringify({ success: true, course: foundCourse }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
