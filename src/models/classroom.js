import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    division: {
      type: Number,
      required: true,
    },
    students: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        roll_number: String,
      },
    ],
    heads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Classroom ||
  mongoose.model("Classroom", classroomSchema);
