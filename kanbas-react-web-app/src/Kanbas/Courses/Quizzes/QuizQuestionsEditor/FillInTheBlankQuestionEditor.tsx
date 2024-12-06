import React, { useState } from "react";
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
    <div className="question-editor">
      <p>
        Enter your question text, then define all possible correct answers for
        the blank. Students will see the questions followed by a small text box
        to type their answer.
      </p>
      <div className="question-body">
        <label>
          Question:
          <textarea
            placeholder="Enter your question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="form-control mb-3"
          />
        </label>
        <div className="answers-section">
          <h3>Answers:</h3>
          {answers.map((answer, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e)}
                placeholder={`Answer ${index + 1}`}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => removeAnswer(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addAnswer}
          >
            + Add Another Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlankQuestionEditor;
