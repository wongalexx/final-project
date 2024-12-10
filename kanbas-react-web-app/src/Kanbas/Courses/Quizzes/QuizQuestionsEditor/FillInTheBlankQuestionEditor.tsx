import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { useParams } from "react-router";
import UpdateQuestionButtons from "./UpdateQuestionButtons";
import { useDispatch } from "react-redux";
import { updateQuestions } from "./reducer";

const FillInTheBlankQuestionEditor = ({
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
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(
    question.answers || [{ text: "", correct: false }]
  );
  const [updateQuestion, setUpdateQuestion] = useState({
    questionText: "",
    answers: question.answers || [{ text: "", correct: false }],
    ...question,
  });
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    updateQuestion.answers && Array.isArray(question.answers)
      ? updateQuestion.answers.findIndex((answer: any) => answer.correct)
      : null
  );

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateQuestion(
      updateQuestion.answers.map((answer: any, i: any) =>
        i === index ? { ...answer, text: e.target.value } : answer
      )
    );
  };

  const addAnswer = () => {
    setUpdateQuestion([
      ...updateQuestion.answers,
      { text: "", correct: false },
    ]);
  };

  const removeAnswer = (index: number) => {
    setUpdateQuestion(
      updateQuestion.answers.filter((_: any, i: any) => i !== index)
    );
    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    } else if (correctAnswerIndex && correctAnswerIndex > index) {
      setCorrectAnswerIndex(correctAnswerIndex - 1);
    }
  };

  const toggleCorrectAnswer = (index: number) => {
    const updatedAnswers = answers.map((answer: any, i: any) => ({
      ...answer,
      correct: i === index ? !answer.correct : false,
    }));
    setAnswers(updatedAnswers);
    setUpdateQuestion({ ...updateQuestion, answers: updatedAnswers });
    // setCorrectAnswerIndex(index === correctAnswerIndex ? null : index);
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
        <div className="answers-section">
          <b>Answers:</b>
          {Array.isArray(question.answers) &&
            question.answers.map((answer: any, index: number) => (
              <div key={index} className="input-group mb-2 align-items-center">
                <div className="choice d-flex align-items-center w-100">
                  <span
                    className={`answer-choice-text me-2 text-nowrap d-flex align-items-center justify-content-start ${
                      answer.correct ? "text-success" : "text-muted"
                    }`}
                    style={{
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      width: "155px",
                    }}
                    // onClick={() =>
                    //   setCorrectAnswerIndex(
                    //     index === correctAnswerIndex ? null : index
                    //   )
                    // }
                  >
                    {answer.correct ? "Correct Answer" : "Possible Answer"}
                  </span>
                  <div className="input-group flex-grow-1">
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
                      style={{ flexShrink: 0 }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div>
            Click the 'Add Another Answer' button (+ Add Another Answer) to add
            a new answer.
          </div>
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
      <UpdateQuestionButtons
        quiz={quiz}
        question={question}
        handleUpdateQuestion={handleUpdateQuestion}
        cancelEdit={cancelEdit}
      />
    </div>
  );
};

export default FillInTheBlankQuestionEditor;
