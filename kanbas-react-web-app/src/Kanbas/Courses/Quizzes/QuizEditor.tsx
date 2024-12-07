import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor/QuizQuestionsEditor";

export default function QuizEditor() {
  const { cid, qid, qtitle } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [newQuiz, setNewQuiz] = useState({
    _id: 1,
    title: "New Quiz",
    course: "",
    quizType: "",
    points: 100,
    assignmentGroup: "",
    shuffleAnswers: true,
    timeLimit: 30,
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

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div id="quiz-editor">
      {/* <span className="d-flex justify-content-end align-items-center">
        <b className="pe-2">Points {newQuiz.points}</b>
        <span className="pe-2">
          <GreenCheckmark /> or <FcCancel className="fs-3" />
          {newQuiz.published ? "Published" : "Not Published"}
        </span>
        <button className="btn btn-secondary btn-sm ms-1">
          <IoEllipsisVertical className="fs-4" />
        </button>
      </span> */}
      <hr />
      {((qid && qid !== "new") || (qtitle && qtitle !== "new")) && (
        <>
          <span className="d-flex justify-content-end align-items-center">
            <b className="pe-2">Points {newQuiz.points}</b>
            <span className="pe-2">
              <GreenCheckmark /> or <FcCancel className="fs-3" />
              {newQuiz.published ? "Published" : "Not Published"}
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
      {activeTab === "details" && <QuizDetailsEditor quiz={newQuiz} />}
      {activeTab === "questions" && <QuizQuestionsEditor />}
      <div className="col">
        <hr />
        <div className="mt-2">
          <div className="row float-end">
            <div className="col">
              <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                <button className="btn btn-secondary btn-lg me-2">
                  Cancel
                </button>
              </a>
              <button className="btn btn-danger btn-lg">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
