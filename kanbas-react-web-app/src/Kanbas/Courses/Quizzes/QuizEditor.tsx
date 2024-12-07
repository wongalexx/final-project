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
  const quiz = quizzes.find((quiz: any) => quiz._id === qid) || {
    title: "",
    points: 0,
    published: false,
    instructions: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    availableFromDate: "",
    due: "",
    availableUntilDate: "",
    questions: [],
  };

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div id="quiz-editor">
      {((qid && qid !== "new") || (qtitle && qtitle !== "new")) && (
        <>
          <span className="d-flex justify-content-end align-items-center">
            <b className="pe-3">Points {quiz.points}</b>
            <span className="pe-3">
              {quiz.published ? (
                <span className="d-flex align-items-center justify-content-center">
                  <GreenCheckmark /> Published
                </span>
              ) : (
                <span className="d-flex align-items-center justify-content-center">
                  <FcCancel className="fs-3 me-2" /> Unpublished
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
      {activeTab === "details" && <QuizDetailsEditor quiz={quiz} />}
      {activeTab === "questions" && <QuizQuestionsEditor quiz={quiz} />}
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
