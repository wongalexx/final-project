import React, { useState } from "react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { useParams } from "react-router";
import UpdateQuestionButtons from "./UpdateQuestionButtons";
import { useDispatch } from "react-redux";
import { updateQuestions } from "./reducer";

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
  const { cid, qid, qtitle } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [updateQuestion, setUpdateQuestion] = useState({
    questionText: "",
    answers: question.answers || [{ text: "", correct: false }],
    ...question,
  });
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
          <textarea
            className="form-control"
            id="wd-fill-in-the-blank-question"
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
        </label>
        <div className="true-false-section d-flex flex-column">
          <b>Answers:</b>
          {qid === "new" && (
            <>
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
            </>
          )}
          {qid !== "new" &&
            Array.isArray(question.answers) &&
            question.answers.map((answer: any, index: number) => (
              <div key={index} className="d-flex align-items-center mt-2 ms-4">
                {answer.text.toLowerCase() === "true" ? (
                  <>
                    {answer.correct && (
                      <TbArrowBigRightFilled className="text-success me-2" />
                    )}
                    <span
                      className={`fw-bold ${
                        answer.correct ? "text-success" : "text-dark"
                      }`}
                      onClick={() => handleClick("true")}
                      style={{ cursor: "pointer" }}
                    >
                      True
                    </span>
                  </>
                ) : answer.text.toLowerCase() === "false" ? (
                  <>
                    {answer.correct && (
                      <TbArrowBigRightFilled className="text-danger me-2" />
                    )}
                    <span
                      className={`fw-bold ${
                        answer.correct ? "text-danger" : "text-dark"
                      }`}
                      onClick={() => handleClick("false")}
                      style={{ cursor: "pointer" }}
                    >
                      False
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className={`fw-bold ${
                        answer.correct ? "text-primary" : "text-dark"
                      }`}
                      onClick={() => handleClick(answer.text)}
                      style={{ cursor: "pointer" }}
                    >
                      {answer.text}
                    </span>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      <UpdateQuestionButtons
        quiz={quiz}
        question={question}
        handleUpdateQuestion={handleUpdateQuestion}
        cancelEdit={cancelEdit}
      />
    </div>
  );
};

export default TrueFalseQuestionEditor;
