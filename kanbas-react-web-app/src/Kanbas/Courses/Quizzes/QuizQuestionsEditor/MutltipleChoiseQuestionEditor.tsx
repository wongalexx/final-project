import React from "react";

const MultipleChoiceQuestionEditor = () => {
  return (
    <div className="question-editor">
      <div className="question-body">
        <div className="mb-2">
          Enter your question and multiple answers, then select the one correct
          answer.
        </div>
        <div className="mb-2">
          <label htmlFor="wd-multiple-choice-question">
            <b>Question:</b>
          </label>
          <textarea
            className="form-control"
            id="wd-multiple-choice-question"
            placeholder="Enter your question here"
          />
        </div>
        <div className="choices-section">
          <b>Answers:</b>
          <div className="choice">
            <input type="radio" name="correct-answer" />
            <input type="text" placeholder="Possible Answer 1" />
          </div>
          <div className="choice">
            <input type="radio" name="correct-answer" />
            <input type="text" placeholder="Possible Answer 2" />
          </div>
          <div className="choice">
            <input type="radio" name="correct-answer" />
            <input type="text" placeholder="Possible Answer 3" />
          </div>
          <button className="add-choice">+ Add Another Answer</button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionEditor;
