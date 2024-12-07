import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useParams } from "react-router";
import DeletePopup from "./DeletePopup";
const QuizContextMenu = ({
  quiz,
  quizId,
  deleteQuiz,
}: {
  quiz: any;
  quizId: string;
  deleteQuiz: (quizId: string) => void;
}) => {
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
          <a className="dropdown-item" href="#">
            <FaTrash data-bs-toggle="modal" data-bs-target="#wd-delete-quiz" />{" "}
            Delete
          </a>
        </li>

        {/* Place this outside the dropdown */}
        <DeletePopup
          dialogTitle="Delete Quiz"
          moduleName={quiz.title}
          deleteAssignment={() => deleteQuiz(quiz._id)}
        />
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
