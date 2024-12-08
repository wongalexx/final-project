import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AiOutlinePlus } from "react-icons/ai";
import MultipleChoiceQuestionEditor from "./MutltipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";
import * as quizClient from "../client";
import * as questionsClient from "./client";
import { setQuestions, addQuestions, deleteQuestions } from "./reducer";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

const QuizQuestionsEditor = () => {
  const dispatch = useDispatch();
  const { cid, qid, qtitle } = useParams();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const isNewQuiz = qid === "new";

  const fetchQuestions = async () => {
    if (qtitle !== "new") {
      const questions = await quizClient.findQuestionsForQuiz(qid);
      dispatch(setQuestions(questions));
    } else {
      dispatch(setQuestions([]));
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [cid, qid, questions]);
  const question = questions.find((q: any) => q._id === qid);

  const [newQuestion, setNewQuestion] = useState({
    _id: 1,
    title: "new title",
    points: 10,
    questionText: "",
    type: "Multiple Choice",
    answers: {
      text: "Question.",
      correct: true,
    },
    ...question,
  });

  const addNewQuestion = async () => {
    const questionData = {
      _id: new Date().getTime().toString(),
      ...newQuestion,
      course: cid,
    };
    const question = await quizClient.createQuestionsForQuiz(qid, questionData);
    dispatch(addQuestions(question));
  };

  const deleteQuestion = async (qid: string, questionId: string) => {
    await questionsClient.deleteQuestion(qid as string, questionId as string);
    dispatch(deleteQuestions(qid));
  };

  const toggleEditMode = (id: any) => {
    const updatedQuestions = questions.map((q: any) =>
      q._id === id ? { ...q, editMode: !q.editMode } : q
    );
    dispatch(setQuestions(updatedQuestions));
  };

  const changeQuestionType = (id: any, newType: any) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((q: any) =>
        q._id === id ? { ...q, type: newType } : q
      )
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
        {questions.map((question: any) => (
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
                  <MultipleChoiceQuestionEditor question={question} />
                )}
                {question.type === "True/False" && (
                  <TrueFalseQuestionEditor question={question} />
                )}
                {question.type === "Fill in the Blank" && (
                  <FillInTheBlankQuestionEditor question={question} />
                )}
                <div className="mt-3 ms-4">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => toggleEditMode(question._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleEditMode(question._id)}
                  >
                    Update Question
                  </button>
                </div>
              </li>
            ) : (
              <li className="list-group-item p-3 ps-1 d-flex align-items-center">
                <span
                  className="ms-2"
                  onClick={() => toggleEditMode(question._id)}
                >
                  {question.title}
                </span>

                <div className="col d-flex justify-content-end align-items-center">
                  <FaTrashCan
                    className="me-2"
                    onClick={() => deleteQuestion(qid as string, question._id)}
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
