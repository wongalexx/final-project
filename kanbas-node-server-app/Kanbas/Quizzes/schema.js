import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  // quiz: String,
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
  title: String,
  points: Number,
  questionText: String,
  type: {
    type: String,
    enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
    required: true,
  },
  answers: [
    {
      text: String,
      correct: Boolean,
    },
  ],
});

const quizSchema = new mongoose.Schema(
  {
    title: String,
    //course: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    instructions: String,
    quizType: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    points: Number,
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attemptsAllowed: {
      type: Number,
      default: 1,
    },
    showCorrectAnswers: {
      type: String,
      enum: ["Never", "Immediately", "After Due Date"],
      default: "Never",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    availableFromDate: String,
    availableUntilDate: String,
    due: String,
    published: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);

export { questionSchema, quizSchema };
