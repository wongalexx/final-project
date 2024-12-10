import * as quizResponsesDao from "./dao.js";

export default function QuizResponseRoutes(app) {
  app.get("/api/quizzes/:quizId/grade", async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    const responses = await quizResponsesDao.findQuizResponsesForUser(
      quizId,
      currentUser._id
    );
    res.json(questions);
  });

  app.post("/api/quizzes/:quizId/grade", async (req, res) => {
    const { quizId } = req.params;
    const currentUser = req.session["currentUser"];
    const response = {
      ...req.body,
      quiz: quizId,
      user: currentUser._id,
    };
    const status = await quizResponsesDao.createQuizResponse(response);
    res.send(status);
  });
}
