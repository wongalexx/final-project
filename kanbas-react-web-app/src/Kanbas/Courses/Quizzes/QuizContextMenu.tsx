import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router";
const QuizContextMenu = ({ quiz }: { quiz: any }) => {
  const { cid } = useParams();
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
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              /* Delete functionality */
            }}
          >
            <FaTrash /> Delete
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              /* Publish functionality */
            }}
          >
            {quiz.published ? <FcCancel /> : <GreenCheckmark />}
            {quiz.published ? "Unpublish" : "Publish"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default QuizContextMenu;
