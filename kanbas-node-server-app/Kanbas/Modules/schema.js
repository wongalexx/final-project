import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    // course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    course: String,
  },
  { collection: "modules" }
);
export default schema;
