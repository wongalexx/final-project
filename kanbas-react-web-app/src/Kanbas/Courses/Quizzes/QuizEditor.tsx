import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor/QuizQuestionsEditor";
import mongoose from "mongoose";
import { updateQuizzes } from "./reducer";
import * as quizClient from "./client";

export default function QuizEditor() {
  const { cid, qid, qtitle } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [questions, setQuestions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const quizId = qid === "new" ? new mongoose.Types.ObjectId() : qid;

  const [newQuiz, setNewQuiz] = useState({
    _id: quizId,
    title: "New Quiz",
    course: "",
    quizType: "",
    points: 100,
    assignmentGroup: "",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: true,
    availableFromDate: "2024-11-01T00:00:00",
    availableUntilDate: "2024-11-10T23:59:59",
    due: "2024-11-10T23:59:59",
    questions: [],
    published: true,
    ...quiz,
  });

  const fetchQuestionsAndCalculatePoints = async () => {
    if (!qid || qid === "new") {
      console.log("Skipping fetch for new quiz");
      return;
    }

    try {
      const fetchedQuestions = await quizClient.findQuestionsForQuiz(qid);
      setQuestions(fetchedQuestions);

      const pointsSum = fetchedQuestions.reduce(
        (sum: number, question: any) => sum + (question.points || 0),
        0
      );
      setTotalPoints(pointsSum);
      setNewQuiz((prevQuiz: any) => ({ ...prevQuiz, points: pointsSum }));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestionsAndCalculatePoints();
  }, [qid]);

  const dispatch = useDispatch();

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  useEffect(() => {}, [cid, qid]);

  return (
    <div id="quiz-editor">
      {((qid && qid !== "new") || (qtitle && qtitle !== "new")) && (
        <>
          <span className="d-flex justify-content-end align-items-center">
            <b className="pe-3">Points {totalPoints}</b>{" "}
            <span className="pe-3">
              {newQuiz.published ? (
                <span
                  className="d-flex align-items-center justify-content-center"
                  onClick={async () => {
                    const updatedQuiz = { ...newQuiz, published: false };
                    await quizClient.updateQuiz(updatedQuiz);
                    setNewQuiz(updatedQuiz);
                    dispatch(updateQuizzes(updatedQuiz));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <GreenCheckmark />
                  Published
                </span>
              ) : (
                <span
                  className="d-flex align-items-center justify-content-center"
                  onClick={async () => {
                    const updatedQuiz = { ...newQuiz, published: true };
                    await quizClient.updateQuiz(updatedQuiz);
                    setNewQuiz(updatedQuiz);
                    dispatch(updateQuizzes(updatedQuiz));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FcCancel className="fs-3" />
                  Unpublished
                </span>
              )}
            </span>
            <button className="btn btn-secondary btn-sm ms-1">
              <IoEllipsisVertical className="fs-4" />
            </button>
          </span>
          <hr />
        </>
      )}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "details" ? "active" : "inactive-tab"
            }`}
            onClick={() => handleTabChange("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "questions" ? "active" : "inactive-tab"
            }`}
            onClick={() => handleTabChange("questions")}
          >
            Questions
          </button>
        </li>
      </ul>
      {activeTab === "details" && <QuizDetailsEditor q={newQuiz} />}
      {activeTab === "questions" && <QuizQuestionsEditor quiz={newQuiz} />}
    </div>
  );
}
