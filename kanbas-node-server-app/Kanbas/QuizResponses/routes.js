import * as quizResponsesDao from "./dao.js";

export default function QuizResponseRoutes(app) {
  app.get("/api/quizzes/grade", async (req, res) => {
    const responses = await quizResponsesDao.findAllResponses();
  });
}
