import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: Date,
    time: {
      start: String,
      end: String,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    records: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["P", "A"] },
      },
    ],
  },
  { timestamps: true, collection: "attendance" },
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);
