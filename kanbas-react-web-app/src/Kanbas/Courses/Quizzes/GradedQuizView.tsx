import React from "react";
import { useLocation } from "react-router-dom";

const GradedQuizView = () => {
  const location = useLocation();
  const { quiz, gradedAnswers, score, total } = location.state || {};

  if (!quiz || !gradedAnswers) return <p>Invalid quiz data.</p>;

  return (
    <div className="container">
      <h1>{quiz.title}</h1>
      <p>
        Your Score: {score} / {total}
      </p>
      <hr />

      {quiz.questions.map((question: any, index: number) => (
        <div key={index} className="card mb-3">
          <div className="card-header d-flex justify-content-between">
            <h4>{question.title}</h4>
            <span>{question.points} pts</span>
          </div>
          <div className="card-body">
            <p>{question.questionText}</p>
            {question.type === "Multiple Choice" ||
            question.type === "True/False" ? (
              <ul>
                {question.answers.map((answer: any) => (
                  <li
                    key={answer.text}
                    className={
                      answer.text === gradedAnswers[question._id]
                        ? answer.correct
                          ? "text-success"
                          : "text-danger"
                        : ""
                    }
                  >
                    {answer.text}
                  </li>
                ))}
              </ul>
            ) : question.type === "Fill in the Blank" ? (
              <p
                className={
                  gradedAnswers[question._id].isCorrect
                    ? "text-success"
                    : "text-danger"
                }
              >
                Your Answer: {gradedAnswers[question._id].answer}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradedQuizView;
