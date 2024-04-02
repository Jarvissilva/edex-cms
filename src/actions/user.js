"use server";
import connectDatabase from "utilities/connectDatabase";
import UserModel from "models/user";
import ClassroomModel from "models/classroom";
import { revalidatePath } from "next/cache";

export async function newUser(_, formData) {
  try {
    await connectDatabase();

    const newUser = await new UserModel({
      role: formData.get("role"),
      name: formData.get("name"),
      email: formData.get("email"),
    }).save();

    if (formData.get("role") === "student") {
      const foundClassroom = await ClassroomModel.findById(
        formData.get("classroom"),
      );
      foundClassroom.students.push({
        student: newUser._id,
        roll_number: formData.get("roll_number"),
      });

      await foundClassroom.save();

      revalidatePath(
        "/dashboard/courses/[courseId]/classroom/[classroomId]/edit",
        "page",
      );
    } else {
      revalidatePath("/dashboard/teachers", "page");
    }

    return { success: true, message: "User successfully created" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function editUser(_, formData) {
  try {
    await connectDatabase();

    const updatedUser = await UserModel.findByIdAndUpdate(
      formData.get("id"),
      {
        name: formData.get("name"),
        email: formData.get("email"),
      },
      { new: true },
    );

    if (!updatedUser) {
      return { success: false, message: "User could not be updated" };
    }

    if (formData.get("role") === "student") {
      await ClassroomModel.findOneAndUpdate(
        {
          _id: formData.get("classroom"),
          "students.student": formData.get("id"),
        },
        { $set: { "students.$.roll_number": formData.get("roll_number") } },
        { new: true },
      );
      revalidatePath(
        "/dashboard/courses/[courseId]/classroom/[classroomId]/edit",
        "page",
      );
    } else {
      revalidatePath("/dashboard/teachers", "page");
    }

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getUsers(role) {
  try {
    await connectDatabase();

    const foundUsers = await UserModel.find({ role });

    if (!foundUsers[0])
      return { success: false, message: "Users not found", users: [] };

    return JSON.parse(JSON.stringify({ success: true, users: foundUsers }));
  } catch (error) {
    return { success: false, message: error.message, users: [] };
  }
}
export async function getUser(id) {
  try {
    await connectDatabase();

    const foundUser = await UserModel.findOne({ _id: id });

    if (!foundUser)
      return { success: false, message: "User not found", user: null };

    return JSON.parse(JSON.stringify({ success: true, user: foundUser }));
  } catch (error) {
    return { success: false, message: error.message, user: null };
  }
}
