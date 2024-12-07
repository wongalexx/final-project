import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    //course: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    availableFromDate: String,
    availableUntilDate: String,
    due: String,
    points: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;
