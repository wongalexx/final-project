import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function QuizDetails() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const formatDate = (newDate: string | number | Date) => {
    const date = new Date(newDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // useEffect(() => {}, [cid, qid, quizzes]);

  return (
    <div>
      <span className="d-flex justify-content-center align-items-center">
        {currentUser.role === "FACULTY" ? (
          <>
            <button
              className="btn btn-secondary btn-md me-2"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)
              }
            >
              Preview
            </button>
            <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/${quiz.title}`}>
              <button className="btn btn-secondary btn-md">
                <span className="d-flex justify-content-center align-items-center">
                  <FaPencil className="me-1" /> Edit
                </span>
              </button>
            </a>
          </>
        ) : (
          <button
            className="btn btn-secondary btn-md me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
          >
            Start Quiz
          </button>
        )}
      </span>
      <hr />
      <h1 className="mb-4">
        <b>{quiz.title}</b>
      </h1>
      {currentUser.role === "FACULTY" && (
        <div className="col-6">
          <div className="row">
            <div className="col-6 text-end">
              <b>Quiz Type</b>
            </div>
            <div className="col-6 text-start">{quiz.quizType}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Points</b>
            </div>
            <div className="col-6 text-start">{quiz.points}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Assignment Group</b>
            </div>
            <div className="col-6 text-start">{quiz.assignmentGroup}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Shuffle Answers</b>
            </div>
            <div className="col-6 text-start">
              {quiz.shuffleAnswers ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Time Limit</b>
            </div>
            <div className="col-6 text-start">{quiz.timeLimit}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Multiple Attempts</b>
            </div>
            <div className="col-6 text-start">
              {quiz.multipleAttempts ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>View Responses</b>
            </div>
            <div className="col-6 text-start">
              {quiz.viewResponses ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Show Correct Answers</b>
            </div>
            <div className="col-6 text-start">{quiz.showCorrectAnswers}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>One Question at a Time</b>
            </div>
            <div className="col-6 text-start">
              {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Require Respondus LockDown Browser</b>
            </div>
            <div className="col-6 text-start">
              {quiz.respondusLockDownBrowser ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Required to View Quiz Results</b>
            </div>
            <div className="col-6 text-start">
              {quiz.requiredToViewResults ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Webcam Required</b>
            </div>
            <div className="col-6 text-start">
              {quiz.webcamRequired ? "Yes" : "No"}
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Lock Questions After Answering</b>
            </div>
            <div className="col-6 text-start">
              {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </div>
          </div>
        </div>
      )}
      <div className="col text-start">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Due</th>
              {currentUser.role === "FACULTY" && <th scope="col">For</th>}
              <th scope="col">Available from</th>
              <th scope="col">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.due)}</td>
              {currentUser.role === "FACULTY" && <td>Everyone</td>}
              <td>{formatDate(quiz.availableFromDate)}</td>
              <td>{formatDate(quiz.availableUntilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
