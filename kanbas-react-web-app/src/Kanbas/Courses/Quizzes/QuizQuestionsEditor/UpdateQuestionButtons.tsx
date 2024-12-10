import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setQuestions, updateQuestions } from "./reducer";
import * as quizClient from "../client";
import * as questionsClient from "./client";
import { useEffect } from "react";

export default function UpdateQuestionButtons({
  quiz,
  question,
  handleUpdateQuestion,
  cancelEdit,
}: {
  quiz: any;
  question: any;
  handleUpdateQuestion: (question: any) => void;
  cancelEdit: (id: string) => void;
}) {
  return (
    <div className="mt-3">
      <button
        className="btn btn-secondary me-2"
        onClick={() => cancelEdit(question._id)}
      >
        Close
      </button>
      <button
        className="btn btn-danger"
        onClick={() => handleUpdateQuestion(question)}
      >
        Update Question
      </button>
    </div>
  );
}
