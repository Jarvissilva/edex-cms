"use server";
import path from "path";
import { writeFile } from "fs/promises";
import connectDatabase from "utilities/connectDatabase";
import UserModel from "models/user";
import CollegeModel from "models/college";

export async function setupCollege(_, formData) {
  try {
    await connectDatabase();

    const foundCollege = await CollegeModel.findOne();

    if (foundCollege)
      return { success: false, message: "College already setuped" };

    const logo = formData.get("logo");
    const buffer = Buffer.from(await logo.arrayBuffer());
    await writeFile(path.join(process.cwd(), "public/" + "logo.jpg"), buffer);

    await new UserModel({
      role: "admin",
      name: formData.get("adminName"),
      email: formData.get("adminEmail"),
    }).save();

    await new CollegeModel({
      name: formData.get("collegeName"),
    }).save();

    return { success: true, message: "College Successfully Setuped" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getCollege() {
  try {
    await connectDatabase();

    const foundCollege = await CollegeModel.findOne();

    if (!foundCollege)
      return { success: false, message: "College is not setuped" };

    return JSON.parse(JSON.stringify({ success: true, college: foundCollege }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}
