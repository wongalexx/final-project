import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import { addResponses, setResponses } from "./responseReducer";
import * as userClient from "../../Account/client";

export default function QuizDetails() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const [questions, setQuestions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const { responses } = useSelector((state: any) => state.responsesReducer);

  const findResponseForUser = async () => {
    const response = await userClient.findResponseForUser(
      currentUser._id,
      qid as string
    );

    dispatch(setResponses(response));
  };

  const formatDate = (newDate: string | number | Date) => {
    const date = new Date(newDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });
  };

  const fetchQuestionsAndCalculatePoints = async () => {
    setIsLoading(true);
    if (!qid) return;
    const fetchedQuestions = await quizClient.findQuestionsForQuiz(qid);
    setQuestions(fetchedQuestions);
    const pointsSum = fetchedQuestions.reduce(
      (sum: number, question: any) => sum + (question.points || 0),
      0
    );
    setTotalPoints(pointsSum);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuestionsAndCalculatePoints();
    findResponseForUser();
  }, [qid, quiz]);

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
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/`)}
          >
            Start Quiz
          </button>
        )}
      </span>
      <hr />
      <h1 className="mb-4">
        <b>{quiz.title && quiz.title}</b>
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
            <div className="col-6 text-start">
              {isLoading ? "Loading..." : totalPoints}
            </div>
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
            <div className="col-6 text-start">{quiz.timeLimit || "None"}</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Multiple Attempts</b>
            </div>
            <div className="col-6 text-start">
              {quiz.multipleAttempts ? `Yes (${quiz.attemptsAllowed})` : "No"}
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
              <b>Access Code</b>
            </div>
            <div className="col-6 text-start">{quiz.accessCode || "None"}</div>
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
      <div className="col text-start mb-4">
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
      {currentUser.role !== "FACULTY" && (
        <div className="mb-4">
          <h3>
            <b>Instructions</b>
          </h3>
          <p>{quiz.instructions}</p>
        </div>
      )}
      <div>
        {responses.filter((response: any) => response.quiz === qid).length >
          0 && (
          <>
            <h3>
              <b>Attempt History</b>
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Attempt</th>
                  <th scope="col">Submitted At</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {responses
                  .filter((response: any) => response.quiz === qid)
                  .map((response: any) => (
                    <tr>
                      <td>
                        <button
                          className="btn btn-link text-danger text-decoration-none p-0"
                          onClick={() =>
                            navigate(
                              `/Kanbas/Courses/${cid}/Quizzes/${qid}/Details/${response._id}`
                            )
                          }
                        >
                          Attempt {response.attempt}{" "}
                        </button>
                      </td>
                      <td>{formatDate(response.submittedAt)}</td>
                      <td>
                        {response.grade} out of {quiz.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
