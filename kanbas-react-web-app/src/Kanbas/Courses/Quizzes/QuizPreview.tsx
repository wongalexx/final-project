import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for testing
const fakeQuiz = {
  _id: "6751db5462c6e57969110b39", // Example quiz ID
  title: "Physics and Chemistry Quiz",
  questions: [
    {
      quiz: { $oid: "6752254f0f0d38ca72f0c902" },
      title: "Newton's Third Law",
      points: 5,
      questionText:
        "Which of the following best describes Newton's Third Law of Motion?",
      type: "Multiple Choice",
      answers: [
        {
          text: "Every action has an equal and opposite reaction.",
          correct: true,
        },
        { text: "Objects in motion stay in motion.", correct: false },
        { text: "Force equals mass times acceleration.", correct: false },
      ],
    },
    {
      quiz: { $oid: "6752254f0f0d38ca72f0c903" },
      title: "Specific Impulse",
      points: 10,
      questionText:
        "What is the specific impulse of a rocket engine a measure of?",
      type: "Multiple Choice",
      answers: [
        { text: "The thrust produced per unit of fuel.", correct: false },
        { text: "The efficiency of propellant usage.", correct: true },
        { text: "The total fuel consumed during launch.", correct: false },
      ],
    },
    {
      quiz: { $oid: "6752254f0f0d38ca72f0c907" },
      title: "Heat Shields",
      points: 5,
      questionText: "What is the main purpose of heat shields in spacecraft?",
      type: "True/False",
      answers: [
        { text: "True", correct: true },
        { text: "False", correct: false },
      ],
    },
  ],
};

export default function QuizPreviewScreen({ quiz = fakeQuiz }: { quiz?: any }) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${quiz._id}/Quizzes/${quiz._id}/editor`);
  };

  return (
    <div className="container mt-4">
      <h1>{quiz.title}</h1>
      <p>
        <b>Instructions:</b> Answer all questions below. Submit when done.
      </p>
      {quiz.questions.length > 0 ? (
        quiz.questions.map((question: any, index: number) => (
          <div key={index} className="card mb-3">
            <div className="card-header d-flex justify-content-between">
              <h4>{question.title}</h4>
              <span>{question.points} pts</span>
            </div>
            <div className="card-body">
              <p>{question.questionText}</p>
              {question.type === "Multiple Choice" && (
                <div className="list-group">
                  {question.answers.map((answer: any, idx: number) => (
                    <label
                      key={idx}
                      className="list-group-item d-flex align-items-center"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer.text}
                        checked={answers[index] === answer.text}
                        onChange={() =>
                          handleAnswerChange(String(index), answer.text)
                        }
                        className="me-2"
                      />
                      {answer.text}
                    </label>
                  ))}
                </div>
              )}
              {question.type === "True/False" && (
                <div className="list-group">
                  {question.answers.map((answer: any, idx: number) => (
                    <label
                      key={idx}
                      className="list-group-item d-flex align-items-center"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer.text}
                        checked={answers[index] === answer.text}
                        onChange={() =>
                          handleAnswerChange(String(index), answer.text)
                        }
                        className="me-2"
                      />
                      {answer.text}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No questions available for this quiz.</p>
      )}
      <div className="d-flex justify-content-between mt-4">
        {/* "Keep Editing This Quiz" Button */}
        <button className="btn btn-secondary" onClick={handleEditQuiz}>
          Keep Editing This Quiz
        </button>
        {/* Submit Button */}
        <button
          className="btn btn-primary"
          onClick={() => console.log("Submitted answers:", answers)}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
