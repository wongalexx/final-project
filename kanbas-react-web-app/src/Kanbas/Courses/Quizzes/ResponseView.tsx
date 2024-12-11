import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import * as userClient from "../../Account/client";
import { addResponses, setResponses } from "./responseReducer";

export default function ResponseView() {
  const { qid, responseId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { responses } = useSelector((state: any) => state.responsesReducer);
  const [response, setResponse] = useState<any>(null);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quizFromRedux = quizzes.find((quiz: any) => quiz._id === qid);
  const [quiz, setQuiz] = useState<any>(
    quizFromRedux || { title: "", questions: [], attemptsAllowed: 0 }
  );

  const fetchQuizData = async () => {
    try {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      setQuiz((prevQuiz: any) => ({
        ...prevQuiz,
        title: prevQuiz.title || quizFromRedux?.title || "Untitled Quiz",
        questions,
      }));
    } catch (err) {
      console.error("Failed to fetch quiz data:", err);
    }
  };

  const findResponseForUser = async () => {
    const response = await userClient.findResponseForUser(
      currentUser._id,
      qid as string
    );

    dispatch(setResponses(response));
  };

  useEffect(() => {
    fetchQuizData();
    findResponseForUser();
    const fetchResponse = async () => {
      // Find the response in Redux state or fetch from API if not available
      const foundResponse = responses.find((r: any) => r._id === responseId);
      if (foundResponse) {
        setResponse(foundResponse);
      }
    };

    fetchResponse();
  }, [responseId]);

  if (!response) return <p>Loading response details...</p>;

  return (
    <div>
      <h2>Response Details</h2>
      <p>
        <b>User:</b> {response.user}
      </p>
      <p>
        <b>Grade:</b> {response.grade}
      </p>
      <p>
        <b>Submitted:</b> {new Date(response.submittedAt).toLocaleString()}
      </p>
      <h3>Quiz Questions and Responses:</h3>
      <ul>
        {Array.isArray(quiz.questions) &&
          quiz.questions.map((question: any, index: number) => {
            const userResponse = response.responses.find(
              (r: any) => r.questionId === question._id
            );

            // Highlight correct answers with a green background
            const isCorrect = userResponse?.isCorrect;

            return (
              <li
                key={index}
                style={{
                  marginBottom: "1.5rem",
                  backgroundColor: isCorrect ? "lightgreen" : "lightcoral",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <b>Question {index + 1}:</b> {question.questionText}
                </p>
                <ul>
                  {Array.isArray(question.answers) &&
                    question.answers.map((option: any, optionIndex: number) => (
                      <li key={optionIndex}>
                        {option.text}

                        {/* {option.correct ? "(Correct)" : ""} */}
                      </li>
                    ))}
                </ul>
                <p>
                  <b>Your Response:</b>{" "}
                  {userResponse?.answer || "No response provided"}{" "}
                  {userResponse?.isCorrect ? "✔️ (Correct)" : "❌ (Incorrect)"}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
