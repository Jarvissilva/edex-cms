import mongoose from "mongoose";

import CollegeModel from "models/college";
import UserModel from "models/user";
import CourseModel from "models/course";
import ClassroomModel from "models/classroom";
import SubjectModel from "models/subject";
import AttendanceModel from "models/attendance";
import ExamModel from "models/exam";

const connectDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Database already connected");
    return;
  } else {
    console.log("Database connected");
    return mongoose.connect(process.env.DATABASE_CONNECTION_URI);
  }
};

export default connectDatabase;
