import * as quizResponsesDao from "./dao.js";

export default function QuizResponseRoutes(app) {
  app.get("/api/quizzes/grade", async (req, res) => {
    try {
      const responses = await quizResponsesDao.findAllResponses();
      res.status(200).json(responses);
    } catch (error) {
      console.error("Error fetching all responses:", error);
      res.status(500).send("Internal Server Error");
    }
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
