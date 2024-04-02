import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "college" },
);

export default mongoose.models.College ||
  mongoose.model("College", collegeSchema);
