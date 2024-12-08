import { quizModel, questionModel } from "./model.js";
import mongoose from "mongoose";

export function findQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId });
}

export function createQuiz(quiz) {
  delete quiz._id;
  return quizModel.create(quiz);
}

export function deleteQuiz(quizId) {
  return quizModel.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return quizModel.updateOne({ _id: quizId }, quizUpdates);
}

export function findQuestionsForQuiz(quizId) {
  const id = new mongoose.Types.ObjectId(quizId);
  return questionModel.find({ quiz: id });
}

export function createQuestion(quizId, question) {
  const id = new mongoose.Types.ObjectId(quizId);
  question.quiz = id;
  return questionModel.create(question);
}

export function deleteQuestion(quizId, questionId) {
  return questionModel.deleteOne({ _id: questionId, quiz: quizId });
}

export function updateQuestion(questionId, questionUpdates) {
  return questionModel.updateOne({ _id: questionId }, questionUpdates);
}

export function toggleQuizPublishedStatus(quizId, isPublished) {
  return quizModel.updateOne(
    { _id: quizId },
    { $set: { published: isPublished } }
  );
}
