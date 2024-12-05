import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { IoEllipsisVertical } from "react-icons/io5";
export default function QuizEditor() {
  const { cid, qid, qtitle } = useParams();
  return (
    <div id="wd-quizzes-editor">
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
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/${qtitle}`}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link inactive-tab" href="#">
            Questions
          </a>
        </li>
      </ul>
      <div className="col-8">
        <input id="wd-name" className="form-control mb-3" value={"QUIZ NAME"} />
      </div>
      <label htmlFor="wd-instructions">Quiz Instructions:</label>
      <textarea className="form-control mb-3" id="wd-instructions" />
      <div className="row mb-4">
        <div className="row mb-2">
          <div className="col-4 d-flex flex-column text-end">Quiz Type</div>
          <div className="col-4 flex-column">
            <select className="form-select w-100" id="wd-type">
              <option value={"Graded Quiz"}>Graded Quiz</option>
              <option value={"Practice Quiz"}>Practice Quiz</option>
              <option value={"Graded Survey"}>Graded Survey</option>
              <option value={"Ungraded Survey"}>Ungraded Survey</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 d-flex flex-column text-end">
            Assignment Group
          </div>
          <div className="col-4 flex-column">
            <select className="form-select w-100" id="wd-type">
              <option value={"Quizzes"}>Quizzes</option>
              <option value={"Exams"}>Exams</option>
              <option value={"Assignments"}>Assignments</option>
              <option value={"Project"}>Project</option>
            </select>
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col-4 d-flex flex-column text-end"></div>
          <div className="col d-flex flex-column">
            Options
            <div className="form-check mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="shuffleAnswers"
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">
                Shuffle Answers
              </label>
            </div>
            <div className="d-flex align-items-center">
              <div className="form-check me-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="timeLimit"
                />
                <label className="form-check-label" htmlFor="timeLimit">
                  Time Limit
                </label>
              </div>
              <input
                id="wd-quiz-minutes"
                className="form-control me-2"
                style={{ width: "60px" }}
              />
              <span>Minutes</span>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="allowMultipleAttempts"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="allowMultipleAttempts"
                  >
                    Allow Multiple Attempts
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4"></div>
          <div className="col-auto">
            <span className="float-start">Assign</span>
          </div>
          <div className="col d-flex flex-column">
            <div className="forms">
              <div className="mb-3">
                <label htmlFor="wd-assign-to">
                  <b>Assign to</b>
                </label>
                <input
                  className="form-control"
                  id="wd-assign-to"
                  value={"Everyone"}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">
                  <b>Due</b>
                </label>
                <div className="input-group">
                  <input
                    id="wd-due-date"
                    type="datetime-local"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col text-left">
                  <label className="form-label" htmlFor="wd-available-from">
                    <b>Available from</b>
                  </label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="wd-available-from"
                  />
                </div>
                <div className="col text-right">
                  <label className="form-label" htmlFor="wd-available-until">
                    <b>Until</b>
                  </label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="wd-available-until"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <hr />
        <div className="mt-3">
          <div className="row float-end">
            <div className="col">
              <a href={`#/Kanbas/Courses/${cid}/Assignments`}>
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
