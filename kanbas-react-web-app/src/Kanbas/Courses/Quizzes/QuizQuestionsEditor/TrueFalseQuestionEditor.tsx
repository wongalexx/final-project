import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import UpdateQuestionButtons from "./UpdateQuestionButtons";
import { updateQuestions } from "./reducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const TrueFalseQuestionEditor = ({
  quiz,
  question,
  handleUpdateQuestion,
  cancelEdit,
}: {
  quiz: any;
  question: any;
  handleUpdateQuestion: (question: any) => void;
  cancelEdit: (id: string) => void;
}) => {
  const dispatch = useDispatch();
  const { qid } = useParams();
  const [updateQuestion, setUpdateQuestion] = useState({
    questionText: question.questionText || "",
    answers: question.answers || [
      { text: "True", correct: false },
      { text: "False", correct: false },
    ],
    ...question,
  });

  const [answers, setAnswers] = useState(
    Array.isArray(question.answers)
      ? question.answers
      : [{ text: "True", correct: false }]
  );

  const toggleCorrectAnswer = (index: number) => {
    const updatedAnswers = answers.map((answer: any, i: number) => ({
      ...answer,
      correct: i === index ? !answer.correct : false,
      text: i === index ? (!answer.correct ? "True" : "False") : answer.text,
    }));
    setAnswers(updatedAnswers);
    setUpdateQuestion({ ...updateQuestion, answers: updatedAnswers });
    dispatch(updateQuestions({ ...updateQuestion, answers: updatedAnswers }));
  };

  return (
    <div className="question-editor m-4">
      <div className="question-body">
        <div className="mb-2">
          Enter your question text and select the correct answer (True or
          False).
        </div>
        <div className="mb-2">
          <label htmlFor="wd-true-false-question">
            <b>Question:</b>
          </label>
          <textarea
            className="form-control"
            id="wd-true-false-question"
            placeholder="Enter question..."
            value={updateQuestion.questionText}
            onChange={(e) => {
              const newQuestionText = e.target.value;
              const updatedQuestion = {
                ...updateQuestion,
                questionText: newQuestionText,
              };
              setUpdateQuestion(updatedQuestion);
              dispatch(updateQuestions(updatedQuestion));
            }}
          />
        </div>
        <div className="choices-section">
          <b>Answers:</b>
          <>
            {answers.map((answer: any, index: any) => (
              <div key={index} className="input-group mb-2 align-items-center">
                <div className="choice d-flex align-items-center w-100">
                  <span
                    className={`answer-choice-text me-2 text-nowrap d-flex align-items-center justify-content-start ${
                      answer.correct ? "text-success" : "text-danger"
                    }`}
                    style={{
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      width: "155px",
                    }}
                    onClick={() => toggleCorrectAnswer(index)}
                  >
                    {answer.correct ? "True" : "False"} <br />
                  </span>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
      <UpdateQuestionButtons
        quiz={quiz}
        question={updateQuestion}
        handleUpdateQuestion={handleUpdateQuestion}
        cancelEdit={cancelEdit}
      />
    </div>
  );
};

export default TrueFalseQuestionEditor;
