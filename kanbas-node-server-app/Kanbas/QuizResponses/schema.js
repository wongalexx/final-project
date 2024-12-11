import mongoose from "mongoose";

const quizResponseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizModel",
    },
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionModel",
        },
        answer: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
          default: null,
        },
      },
    ],
    grade: {
      type: Number,
      default: null,
    },
    attempt: Number,
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    timestamps: Date,
  },
  { collection: "responses" }
);

export default quizResponseSchema;
