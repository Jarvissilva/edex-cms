import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    short_name: {
      type: String,
      unique: true,
      required: true,
    },
    years: {
      type: Number,
      required: true,
    },
    semesters: {
      type: Number,
      required: true,
    },
    heads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
