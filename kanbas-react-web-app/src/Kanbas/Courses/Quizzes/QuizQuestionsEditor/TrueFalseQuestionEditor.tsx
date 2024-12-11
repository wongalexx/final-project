import React, { useState } from "react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { updateQuestions } from "./reducer";
import { useDispatch } from "react-redux";
import UpdateQuestionButtons from "./UpdateQuestionButtons";

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
  const [updateQuestion, setUpdateQuestion] = useState({
    questionText: question.questionText || "",
    answers: [
      {
        text: question.answers?.[0]?.text || "True",
        correct: true,
      },
    ],
    ...question,
  });

  const [selectedOption, setSelectedOption] = useState(
    question.answers?.[0]?.text.toLowerCase() || "true"
  );

  const handleSelectOption = (value: "true" | "false") => {
    const updatedAnswers = [
      {
        text: value === "true" ? "True" : "False",
        correct: true,
      },
    ];
    setSelectedOption(value);
    setUpdateQuestion((prev: any) => ({
      ...prev,
      answers: updatedAnswers,
    }));
    dispatch(updateQuestions({ ...updateQuestion, answers: updatedAnswers }));
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
          value={updateQuestion.questionText}
          onChange={(e) =>
            setUpdateQuestion((prev: any) => ({
              ...prev,
              questionText: e.target.value,
            }))
          }
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
              onClick={() => handleSelectOption("true")}
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
              onClick={() => handleSelectOption("false")}
              style={{ cursor: "pointer" }}
            >
              False
            </span>
          </div>
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
