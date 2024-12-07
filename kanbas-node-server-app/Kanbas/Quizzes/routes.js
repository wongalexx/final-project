import * as quizzesDao from "./dao.js";
export default function QuizRoutes(app) {
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });

  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await quizzesDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = req.body;
    const status = await quizzesDao.createQuestion(quizId, question);
    res.send(status);
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await quizzesDao.deleteQuestion(quizId, questionId);
    res.send(status);
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await quizzesDao.updateQuestion(questionId, questionUpdates);
    res.send(status);
  });

  app.put("/api/quizzes/:quizId/published", async (req, res) => {
    const { quizId } = req.params;
    const { isPublished } = req.body;
    const status = await quizzesDao.toggleQuizPublishedStatus(
      quizId,
      isPublished
    );
    res.send(status);
  });
}
