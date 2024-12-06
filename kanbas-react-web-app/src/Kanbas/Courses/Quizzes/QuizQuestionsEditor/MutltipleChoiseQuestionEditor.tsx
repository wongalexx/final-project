import React from "react";

const MultipleChoiceQuestionEditor = () => {
  return (
    <div className="question-editor">
      <h2>Multiple Choice Question</h2>
      <div className="question-header">
        <label>
          Title: <input type="text" placeholder="Enter question title" />
        </label>
      </div>
      <div className="question-body">
        <label>
          Question:
          <textarea placeholder="Enter your question here"></textarea>
        </label>
        <div className="choices-section">
          <h3>Answers:</h3>
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
