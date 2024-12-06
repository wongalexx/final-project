import React from "react";

const TrueFalseQuestionEditor = () => {
  return (
    <div className="question-editor">
      <h2>True/False Question</h2>
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
        <div className="true-false-section">
          <h3>Answers:</h3>
          <label>
            <input type="radio" name="true-false" value="true" /> True
          </label>
          <label>
            <input type="radio" name="true-false" value="false" /> False
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestionEditor;
