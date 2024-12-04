import model from "./model.js";
export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

export async function findQuestionsForQuiz(quizId) {
  const quiz = await model.findOne({ _id: quizId }, { questions: 1, _id: 0 });
  return quiz.questions;
}

export function createQuestion(quizId, question) {
  return model.updateOne({ _id: quizId }, { $push: { questions: question } });
}

export function deleteQuestion(quizId, questionId) {
  return model.updateOne(
    { _id: quizId },
    { $pull: { questions: { _id: questionId } } }
  );
}

export function updateQuestion(quizId, questionId, questionUpdates) {
  return model.updateOne(
    { _id: quizId, "questions._id": questionId },
    { $set: { "questions.$": questionUpdates } }
  );
}

export function toggleQuizPublishedStatus(quizId, isPublished) {
  return model.updateOne({ _id: quizId }, { $set: { published: isPublished } });
}
