"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDatabase from "utilities/connectDatabase";
import sendMail from "utilities/sendMail";
import UserModel from "models/user";
import CourseModel from "models/course";
import ClassroomModel from "models/classroom";
import SubjectModel from "models/subject";

export async function loginUser(_, formData) {
  try {
    await connectDatabase();

    const foundUser = await UserModel.exists({ email: formData.get("email") });

    if (!foundUser)
      return {
        success: false,
        message: "User does not exists with this email",
      };

    const encodedToken = jwt.sign(
      { _id: foundUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 300,
      },
    );

    await sendMail({
      to: formData.get("email"),
      subject: "Verify your login",
      html: `Welcome back to edex please login by using this link:<a href="${process.env.SITE_URL}/verify-login?token=${encodedToken}">Verify Now</a> or open the below link in your browser: <p>${process.env.SITE_URL}/verify-login?token=${encodedToken}</p>`,
    });

    return {
      success: true,
      message: "Check your mail we sent you a link to login",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function verifyLogin(encodedToken) {
  try {
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);

    await connectDatabase();

    const foundUser = await UserModel.findById(decodedToken._id);

    if (!foundUser) return { success: false, message: "User does not exists" };

    const authToken = jwt.sign(
      { _id: foundUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    cookies().set({
      name: "auth",
      value: authToken,
      httpOnly: true,
      path: "/",
      sameSite: "Strict",
      maxAge: 604800,
    });

    return { success: true, message: "Verified Successfully Redirecting..." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getLoggedUser() {
  try {
    const authCookie = cookies().get("auth");

    if (!authCookie) return { success: false, message: "User not logged in" };

    const decodedToken = jwt.verify(
      authCookie.value,
      process.env.JWT_SECRET_KEY,
    );

    await connectDatabase();

    const foundUser = await UserModel.findById(decodedToken._id);

    if (!foundUser)
      return {
        success: false,
        message: "User does not exist",
      };

    return JSON.parse(JSON.stringify({ success: true, user: foundUser }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function logout() {
  cookies().delete("auth");
}
