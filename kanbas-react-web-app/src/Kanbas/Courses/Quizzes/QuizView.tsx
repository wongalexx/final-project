import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";
import * as quizClient from "./client";
import { addResponses, setResponses } from "./responseReducer";
import * as userClient from "../../Account/client";
import "./style.css";
import { setQuizzes, updateQuizzes, deleteQuizzes } from "./reducer";
import * as coursesClient from "../client";

export default function QuizView() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quizFromRedux = quizzes.find((quiz: any) => quiz._id === qid);
  const [quiz, setQuiz] = useState<any>(
    quizFromRedux || { title: "", questions: [], attemptsAllowed: 0 }
  );
  const [loading, setLoading] = useState(!quizFromRedux);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { responses } = useSelector((state: any) => state.responsesReducer);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [enterPassword, setEnterPassword] = useState(
    quizFromRedux?.accessCode !== ""
  );
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const currentTime = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const fetchQuizzes = async () => {
    try {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const matchingResponse = responses.filter(
    (response: any) => response.user === currentUser._id
  );

  useEffect(() => {
    setStartTime(currentTime);
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  }, [qid, quiz.timeLimit]);

  useEffect(() => {
    fetchQuizzes();
    const fetchQuizData = async () => {
      try {
        const questions = await quizClient.findQuestionsForQuiz(qid);
        setAttemptCount(matchingResponse.length);
        setQuiz((prevQuiz: any) => ({
          ...prevQuiz,
          title: prevQuiz.title || quizFromRedux?.title || "Untitled Quiz",
          questions,
        }));
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
        setError("Failed to load quiz data.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
    if (timeRemaining === null) return;

    if (timeRemaining <= 0) {
      alert("Time is up! Submitting the quiz automatically.");
      handleSubmitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [qid, currentUser, timeRemaining]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!isSubmitted && attemptCount < quiz.attemptsAllowed) {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    }
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`);
  };

  const getAnswerStyle = (question: any, answerText: string) => {
    const selectedAnswer = answers[question._id];
    const correctAnswer = question.answers.find(
      (answer: any) => answer.text === answerText && answer.correct
    );

    if (isSubmitted) {
      if (selectedAnswer === answerText) {
        return correctAnswer ? "correct" : "incorrect";
      }
    }
    return "";
  };

  const handleSubmitQuiz = async () => {
    if (attemptCount >= quiz.attemptsAllowed) {
      alert("You have reached the maximum number of attempts for this quiz.");
      return;
    }

    const quizResponses = quiz.questions.map((question: any) => ({
      questionId: question._id,
      answer: answers[question._id] || "",
      isCorrect: question.answers.some(
        (answer: any) => answer.text === answers[question._id] && answer.correct
      ),
    }));

    const grade = quiz.questions.reduce(
      (total: number, question: any, index: number) => {
        const response = quizResponses[index];
        return total + (response.isCorrect ? question.points || 0 : 0);
      },
      0
    );

    const quizData = {
      attempt: attemptCount + 1,
      grade,
      responses: quizResponses,
    };

    await userClient.createQuizResponse(currentUser._id, qid, quizData);
    dispatch(addResponses(quizData));
    setAttemptCount((prev) => prev + 1);
    setIsSubmitted(true);

    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Details`);
  };

  const handleAccessCodeSubmit = () => {
    if (accessCodeInput === quiz.accessCode) {
      setEnterPassword(false);
    } else {
      alert("Invalid access code. Please try again.");
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  const hasExceededAttempts = attemptCount >= quiz.attemptsAllowed;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      {hasExceededAttempts ? (
        <p>
          <b>
            You have reached the{" "}
            <span className="text-danger">maximum number</span> of attempts (
            {quiz.attemptsAllowed}) and cannot retake the quiz.
          </b>
        </p>
      ) : enterPassword ? (
        <div>
          <h2>Enter Access Code to Start Quiz</h2>
          <div className="d-flex align-items-center">
            <input
              type="text"
              value={accessCodeInput}
              onChange={(e) => setAccessCodeInput(e.target.value)}
              className="form-control"
              placeholder="Enter Access Code..."
              style={{ width: 175 }}
            />
            <button
              onClick={handleAccessCodeSubmit}
              className="ms-2 btn btn-danger"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>{quiz.title}</h1>
          {location.pathname.includes("Preview") && (
            <div className="card mt-2 mb-2 bg-danger-subtle text-danger border-0">
              <div className="card-body">
                <span className="d-flex align-items-center">
                  <PiWarningCircleBold className="me-1" /> This is a preview of
                  the published version of the quiz
                </span>
              </div>
            </div>
          )}
          <span>Started: {startTime || "Loading..."}</span>
          {timeRemaining !== null && (
            <div className="timer">
              <p>
                <strong>Time Remaining: </strong>
                {formatTime(timeRemaining)}
              </p>
            </div>
          )}
          <p>
            <b>Quiz Instructions:</b> Answer all questions below. Submit when
            done.
          </p>
          <hr className="mb-4" />
          {Array.isArray(quiz.questions) &&
            quiz.questions.map((question: any, index: number) => {
              return (
                <div key={index} className="card mb-3">
                  <div className="card-header d-flex justify-content-between">
                    <h4>{question.title}</h4>
                    <span>{question.points} pts</span>
                  </div>
                  <div className="card-body">
                    <p>{question.questionText}</p>
                    {question.type === "Multiple Choice" && (
                      <div className="list-group">
                        {Array.isArray(quiz.questions) &&
                          question.answers.map((answer: any, idx: number) => (
                            <label
                              key={idx}
                              className={`list-group-item d-flex align-items-center ${getAnswerStyle(
                                question,
                                answer.text
                              )}`}
                            >
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={answer.text}
                                checked={answers[question._id] === answer.text}
                                onChange={() =>
                                  handleAnswerChange(question._id, answer.text)
                                }
                                disabled={hasExceededAttempts}
                                className="me-2"
                              />
                              {answer.text}
                            </label>
                          ))}
                      </div>
                    )}
                    {question.type === "True/False" && (
                      <div className="list-group">
                        {["True", "False"].map((option) => (
                          <label
                            key={option}
                            className={`list-group-item d-flex align-items-center ${getAnswerStyle(
                              question,
                              option
                            )}`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={answers[question._id] === option}
                              onChange={() =>
                                handleAnswerChange(question._id, option)
                              }
                              disabled={hasExceededAttempts}
                              className="me-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                    {question.type === "Fill in the Blank" && (
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          style={{ height: "80px" }}
                          value={answers[question._id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question._id, e.target.value)
                          }
                          disabled={hasExceededAttempts}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <ul id="wd-assignments" className="list-group rounded-0 mt-4">
            <li className="list-group-item p-2 ps-1 d-flex justify-content-end align-items-center">
              <div className="me-2">
                Quiz saved at {startTime || "Loading..."}
              </div>
              <button
                className="btn btn-secondary"
                onClick={handleSubmitQuiz}
                disabled={hasExceededAttempts}
              >
                Submit Quiz
              </button>
            </li>
          </ul>
          {location.pathname.includes("Preview") && (
            <div className="d-flex mt-4">
              <button
                className="btn btn-secondary"
                onClick={handleEditQuiz}
                style={{ width: "100%" }}
              >
                <span className="d-flex align-items-center">
                  <FaPencil className="me-1" />
                  Keep Editing This Quiz
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
