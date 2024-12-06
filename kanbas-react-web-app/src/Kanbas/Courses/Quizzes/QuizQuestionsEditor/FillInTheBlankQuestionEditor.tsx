import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

const FillInTheBlankQuestionEditor = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{ text: "" }]);

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = e.target.value;
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { text: "" }]);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  return (
    <div className="question-editor m-4">
      <p>
        Enter your question text, then define all possible correct answers for
        the blank.
        <br />
        Students will see the questions followed by a small text box to type
        their answer.
      </p>
      <div className="question-body">
        <label className="w-100">
          <b>Question:</b>
          <textarea
            placeholder="Enter question..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="form-control mb-3 w-100"
          />
        </label>
        <div className="answers-section">
          <b>Answers:</b>
          {answers.map((answer, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e)}
                placeholder="Enter answer..."
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => removeAnswer(index)}
                disabled={index === 0}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn p-0 text-danger"
              onClick={addAnswer}
              style={{ border: "none", boxShadow: "none" }}
            >
              <span
                className="d-flex align-items-center text-danger"
                style={{ gap: "5px", cursor: "pointer" }}
              >
                <AiOutlinePlus /> Add Another Answer
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlankQuestionEditor;
