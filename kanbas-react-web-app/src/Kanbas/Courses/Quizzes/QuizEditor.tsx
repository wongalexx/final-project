import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor/QuizQuestionsEditor";
import * as quizClient from "./client";
import * as coursesClient from "../client";
import { setQuizzes, updateQuizzes, addQuizzes } from "./reducer";
import { Link } from "react-router-dom";
import mongoose from "mongoose";

export default function QuizEditor() {
  const { cid, qid, qtitle } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

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
            <b className="pe-3">Points {newQuiz.points}</b>
            <span className="pe-3">
              {newQuiz.published ? (
                <span className="d-flex align-items-center justify-content-center">
                  <GreenCheckmark /> Published
                </span>
              ) : (
                <span className="d-flex align-items-center justify-content-center">
                  <FcCancel className="fs-3 me-2" /> Unpublished
                </span>
              )}
            </span>
            {/* <div
              id="wd-unpublish-quiz"
              onChange={() => setNewQuiz({ ...newQuiz, published: false })}
            ></div> */}
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
