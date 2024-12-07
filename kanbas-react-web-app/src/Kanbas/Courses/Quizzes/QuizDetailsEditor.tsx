import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as quizClient from "./client";
import * as coursesClient from "../client";
import { setQuizzes, updateQuizzes, addQuizzes } from "./reducer";

export default function QuizDetailsEditor() {
  function formatToDatetimeLocal(date: string | Date | undefined): string {
    if (!date) return "";
    const formattedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(formattedDate.getTime())) return "";
    return formattedDate.toISOString().slice(0, 16);
  }
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { cid, qid } = useParams();
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
  const dispatch = useDispatch();

  const createQuizForCourse = async () => {
    const quizData = {
      _id: new Date().getTime().toString(),
      ...newQuiz,
      course: cid,
    };
    const quiz = await coursesClient.createQuizzesForCourse(cid, quizData);
    dispatch(addQuizzes(quiz));
  };

  const updateQuiz = async (quiz: any) => {
    await quizClient.updateQuiz(quiz);
    dispatch(updateQuizzes(quiz));
  };

  const handleSave = () => {
    if (qid === "new") {
      createQuizForCourse();
    } else {
      updateQuiz(newQuiz);
    }
  };

  // useEffect(() => {}, [quizzes]);
  return (
    <div id="wd-quizzes-details-editor">
      <div className="col-8">
        <input
          id="wd-name"
          className="form-control mb-3"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({ ...quiz, title: e.target.value })}
          placeholder="Enter quiz title..."
        />
      </div>
      <label htmlFor="wd-instructions">Quiz Instructions:</label>
      <textarea
        className="form-control mb-3"
        id="wd-instructions"
        value={newQuiz.instructions}
      />
      <div className="row mb-4">
        <div className="row mb-2">
          <div className="col-4 d-flex flex-column text-end">Quiz Type</div>
          <div className="col-4 flex-column">
            <select
              className="form-select w-100"
              id="wd-type"
              value={newQuiz.quizType}
            >
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
            <select
              className="form-select w-100"
              id="wd-type"
              value={newQuiz.assignmentGroup}
            >
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
                checked={newQuiz.shuffleAnswers}
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
                  checked={newQuiz.timeLimit}
                />
                <label className="form-check-label" htmlFor="timeLimit">
                  Time Limit
                </label>
              </div>
              <input
                id="wd-quiz-minutes"
                className="form-control me-2"
                style={{ width: "60px" }}
                value={newQuiz.timeLimit}
              />
              <span>Minutes </span>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="allowMultipleAttempts"
                    checked={newQuiz.multipleAttempts}
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
                    value={formatToDatetimeLocal(newQuiz.due)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col text-left">
                  <label className="form-label" htmlFor="wd-available-from">
                    <b>Available from</b>
                  </label>
                  <input
                    type="datetime-local"
                    id="wd-available-from"
                    className="form-control"
                    value={formatToDatetimeLocal(newQuiz.availableFromDate)}
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
                    value={formatToDatetimeLocal(newQuiz.availableUntilDate)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <Link
                className="btn btn-danger btn-lg"
                to={`/Kanbas/Courses/${cid}/Quizzes`}
                onClick={handleSave}
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
