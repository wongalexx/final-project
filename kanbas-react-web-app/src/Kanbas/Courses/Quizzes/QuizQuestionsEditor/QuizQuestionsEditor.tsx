import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import MultipleChoiceQuestionEditor from "./MutltipleChoiseQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";

const QuizQuestionsEditor = ({ quiz }: { quiz: any }) => {
  const [questions, setQuestions] = useState<any[]>([]);

  const addNewQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "Multiple Choice",
      editMode: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const toggleEditMode = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, editMode: !q.editMode } : q
      )
    );
  };

  const changeQuestionType = (id: any, newType: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, type: newType } : q))
    );
  };

  return (
    <div className="quiz-questions-editor mb-4">
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => addNewQuestion()}
        >
          <span className="d-flex align-items-center">
            <AiOutlinePlus className="me-2" /> New Question
          </span>
        </button>
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        {questions.map((question) => (
          <div key={question.id}>
            {question.editMode ? (
              <li className="list-group-item p-3 ps-1">
                <div className="row mb-3 align-items-center m-2">
                  <div className="col d-flex align-items-center">
                    <input
                      className="form-control me-2"
                      placeholder="Question Title"
                      style={{ width: "125px" }}
                    />
                    <label className="mb-0">
                      <select
                        className="form-select"
                        value={question.type}
                        onChange={(e) =>
                          changeQuestionType(question.id, e.target.value)
                        }
                      >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blank">
                          Fill in the Blank
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className="col-auto text-end">
                    <label className="d-flex align-items-center mb-0">
                      <b className="me-2">pts:</b>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        style={{ width: "75px" }}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                {question.type === "Multiple Choice" && (
                  <MultipleChoiceQuestionEditor />
                )}
                {question.type === "True/False" && <TrueFalseQuestionEditor />}
                {question.type === "Fill in the Blank" && (
                  <FillInTheBlankQuestionEditor />
                )}
                <div className="mt-3 ms-4">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => toggleEditMode(question.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleEditMode(question.id)}
                  >
                    Update Question
                  </button>
                </div>
              </li>
            ) : (
              <li className="list-group-item p-3 ps-1">
                <span
                  className="ms-2"
                  onClick={() => toggleEditMode(question.id)}
                >
                  QUESTION TITLE
                </span>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestionsEditor;
