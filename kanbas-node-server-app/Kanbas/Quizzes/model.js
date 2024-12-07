import mongoose from "mongoose";
import { questionSchema, quizSchema } from "./schema.js";
const quizModel = mongoose.model("QuizModel", quizSchema);
const questionModel = mongoose.model("QuestionModel", questionSchema);
export { quizModel, questionModel };
