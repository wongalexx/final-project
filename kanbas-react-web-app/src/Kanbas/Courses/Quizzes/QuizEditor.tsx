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

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div id="quiz-editor">
      <span className="d-flex justify-content-end align-items-center">
        <b className="pe-2">Points (GET QUIZ POINTS)</b>
        <span className="pe-2">
          <GreenCheckmark /> or <FcCancel className="fs-3" />
          (GET IF IT IS PUBLISHED)
        </span>
        <button className="btn btn-secondary btn-sm ms-1">
          <IoEllipsisVertical className="fs-4" />
        </button>
      </span>
      <hr />
      {((qid && qid !== "new") || (qtitle && qtitle !== "new")) && (
        <>
          <span className="d-flex justify-content-end align-items-center">
            <b className="pe-2">Points (GET QUIZ POINTS)</b>
            <span className="pe-2">
              <GreenCheckmark /> or <FcCancel className="fs-3" />
              (GET IF IT IS PUBLISHED)
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
      {activeTab === "details" && <QuizDetailsEditor />}
      {activeTab === "questions" && <QuizQuestionsEditor />}
      <div className="col">
        <hr />
        <div className="mt-3">
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
