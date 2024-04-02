import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    isPublished: { type: Boolean, default: false },
    name: {
      type: String,
      required: true,
    },
    marks: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        total_marks: Number,
        isPublished: { type: Boolean, default: false },
        student_marks: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            obtained: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
