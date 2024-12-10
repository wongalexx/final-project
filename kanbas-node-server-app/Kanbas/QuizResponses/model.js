import mongoose from "mongoose";
import quizResponseSchema from "./schema.js";
const quizResponseModel = mongoose.model(
  "QuizResponseModel",
  quizResponseSchema
);
export default quizResponseModel;
