import React, { useState } from "react";
import { TbArrowBigRightFilled } from "react-icons/tb";

const TrueFalseQuestionEditor = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (value: any) => {
    setSelectedOption(value);
  };

  return (
    <div className="question-editor m-4">
      <div className="mb-2">
        Enter your question text, then select if True or False is the correct
        answer.
      </div>
      <div className="question-body">
        <label htmlFor="wd-true-or-false-question">
          <b>Question:</b>
        </label>
        <textarea
          className="form-control mb-2"
          id="wd-true-or-false-question"
          placeholder="Enter question..."
        />
        <div className="true-false-section d-flex flex-column">
          <b>Answers:</b>
          <div className="d-flex align-items-center mt-2 ms-4">
            {selectedOption === "true" && (
              <TbArrowBigRightFilled className="text-success me-2" />
            )}
            <span
              className={`fw-bold ${
                selectedOption === "true" ? "text-success" : "text-dark"
              }`}
              onClick={() => handleClick("true")}
              style={{ cursor: "pointer" }}
            >
              True
            </span>
          </div>
          <div className="d-flex align-items-center mt-2 ms-4">
            {selectedOption === "false" && (
              <TbArrowBigRightFilled className="text-danger me-2" />
            )}
            <span
              className={`fw-bold ${
                selectedOption === "false" ? "text-danger" : "text-dark"
              }`}
              onClick={() => handleClick("false")}
              style={{ cursor: "pointer" }}
            >
              False
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;
