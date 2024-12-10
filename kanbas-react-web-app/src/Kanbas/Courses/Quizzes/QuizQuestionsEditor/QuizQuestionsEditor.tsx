import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AiOutlinePlus } from "react-icons/ai";
import MultipleChoiceQuestionEditor from "./MutltipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";
import * as quizClient from "../client";
import * as questionsClient from "./client";
import {
  setQuestions,
  addQuestions,
  deleteQuestions,
  updateQuestions,
} from "./reducer";
import { Link } from "react-router-dom";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const QuizQuestionsEditor = ({ quiz }: { quiz: any }) => {
  const dispatch = useDispatch();
  const { cid, qid, qtitle } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const fetchQuestions = async () => {
    if (qtitle !== "new") {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      dispatch(setQuestions(questions));
    } else {
      dispatch(setQuestions([]));
    }
  };

  const addNewQuestion = () => {
    const newQuestion = {
      _id: new Date().getTime().toString(),
      title: "New Question",
      points: 10,
      questionText: "",
      type: "Multiple Choice",
      answers: { text: "", correct: true },
      editMode: true,
      isNew: true,
    };
    dispatch(addQuestions(newQuestion));
  };

  const deleteQuestion = async (qid: string, questionId: string) => {
    await questionsClient.deleteQuestion(qid as string, questionId as string);
    // dispatch(deleteQuestions(qid));
  };

  const cancelEdit = (id: string) => {
    const question = questions.find((q: any) => q._id === id);
    if (question?.isNew) {
      dispatch(setQuestions(questions.filter((q: any) => q._id !== id)));
    } else {
      dispatch(
        setQuestions(
          questions.map((q: any) =>
            q._id === id ? { ...q, editMode: false } : q
          )
        )
      );
    }
  };

  const handleUpdateQuestion = async (question: any) => {
    if (question.isNew) {
      const questionData = { ...question, course: cid };
      const savedQuestion = await quizClient.createQuestionsForQuiz(
        quiz._id,
        questionData
      );
      dispatch(
        setQuestions(
          questions.map((q: any) =>
            q._id === question._id ? { ...savedQuestion, isNew: false } : q
          )
        )
      );
      dispatch(updateQuestions(savedQuestion));
    } else {
      const updatedQuestion = await questionsClient.updateQuestion(
        quiz,
        question
      );
      dispatch(updateQuestions(updatedQuestion));
      cancelEdit(question._id);
    }
  };
  const changeQuestionType = (id: string, newType: string) => {
    dispatch(
      setQuestions(
        questions.map((q: any) => (q._id === id ? { ...q, type: newType } : q))
      )
    );
  };

  useEffect(() => {
    fetchQuestions();
  }, [cid, qid]);
  return (
    <div className="quiz-questions-editor mb-4">
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary btn-lg" onClick={addNewQuestion}>
          <span className="d-flex align-items-center">
            <AiOutlinePlus className="me-2" /> New Question
          </span>
        </button>
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        {questions.map((question: any) => (
          <div key={question._id}>
            {question.editMode ? (
              <li className="list-group-item p-3 ps-1">
                <div className="row mb-3 align-items-center m-2">
                  <div className="col d-flex align-items-center">
                    <input
                      className="form-control me-2"
                      placeholder="Question Title"
                      value={question.title}
                      onChange={(e) =>
                        dispatch(
                          setQuestions(
                            questions.map((q: any) =>
                              q._id === question._id
                                ? { ...q, title: e.target.value }
                                : q
                            )
                          )
                        )
                      }
                      style={{ width: "125px" }}
                    />
                    <label className="mb-0">
                      <select
                        className="form-select"
                        value={question.type}
                        onChange={(e) =>
                          changeQuestionType(question._id, e.target.value)
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
                        value={question.points}
                        onChange={(e) =>
                          dispatch(
                            setQuestions(
                              questions.map((q: any) =>
                                q._id === question._id
                                  ? { ...q, points: +e.target.value }
                                  : q
                              )
                            )
                          )
                        }
                        style={{ width: "75px" }}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                {question.type === "Multiple Choice" && (
                  <MultipleChoiceQuestionEditor
                    quiz={quiz}
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                    cancelEdit={cancelEdit}
                  />
                )}
                {question.type === "True/False" && (
                  <TrueFalseQuestionEditor
                    quiz={quiz}
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                    cancelEdit={cancelEdit}
                  />
                )}
                {question.type === "Fill in the Blank" && (
                  <FillInTheBlankQuestionEditor
                    quiz={quiz}
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                    cancelEdit={cancelEdit}
                  />
                )}
              </li>
            ) : (
              <li className="list-group-item p-3 ps-1 d-flex align-items-center">
                <span className="ms-2">{question.title}</span>
                <div className="col d-flex justify-content-end align-items-center">
                  <FaPencil
                    className="me-2"
                    onClick={() =>
                      dispatch(
                        setQuestions(
                          questions.map((q: any) =>
                            q._id === question._id
                              ? { ...q, editMode: true }
                              : q
                          )
                        )
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                  <FaTrashCan
                    onClick={() => {
                      deleteQuestion(qid as string, question._id);
                      dispatch(deleteQuestions(question._id));
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestionsEditor;
