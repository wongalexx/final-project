import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router";
import * as quizClient from "./client";
import { setQuizzes, updateQuizzes } from "./reducer";
import { useDispatch } from "react-redux";

const QuizContextMenu = ({
  quiz,
  deleteQuiz,
}: {
  quiz: any;
  deleteQuiz: (quizId: string) => void;
}) => {
  const { cid } = useParams();

  const dispatch = useDispatch();

  const updateQuiz = async (quiz: any) => {
    await quizClient.updateQuiz(quiz);
    dispatch(updateQuizzes(quiz));
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-link"
        type="button"
        data-bs-toggle="dropdown"
        style={{ marginTop: "-4px" }}
      >
        <IoEllipsisVertical color="grey" className="fs-3" />
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/${quiz.title}`}
          >
            <FaPencil /> Edit
          </a>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              deleteQuiz(quiz._id);
            }}
          >
            <FaTrash /> Delete
          </button>
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault(); // Prevent the default navigation
              updateQuiz({ ...quiz, published: !quiz.published });
            }}
          >
            {quiz.published ? <FcCancel /> : <GreenCheckmark />}
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default QuizContextMenu;
