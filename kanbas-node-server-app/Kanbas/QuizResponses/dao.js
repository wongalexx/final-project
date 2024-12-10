import quizResponseModel from "./model.js";
import mongoose from "mongoose";

export function findQuizResponsesForUser(quizId, userId) {
  return quizResponseModel.find({ quiz: quizId }, { user: userId });
}

export function createQuizResponse(quizResponse) {
  delete quizResponse._id;
  return quizResponseModel.create(quizResponse);
}
