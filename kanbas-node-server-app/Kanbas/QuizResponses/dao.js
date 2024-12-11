import quizResponseModel from "./model.js";

export function findAllResponses() {
  return quizResponseModel.find();
}

export function findQuizResponsesForUser(quizId, userId) {
  return quizResponseModel.find({ quiz: quizId, user: userId });
}

export function createQuizResponse(quizResponse) {
  delete quizResponse._id;
  return quizResponseModel.create(quizResponse);
}
