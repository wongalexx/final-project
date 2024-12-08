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
  return questionModel.find({ quiz: quizId });
}

export function createQuestion(question) {
  delete question._id;
  return questionModel.create(question);
}

export function deleteQuestion(questionId) {
  return questionModel.deleteOne({ _id: questionId });
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
