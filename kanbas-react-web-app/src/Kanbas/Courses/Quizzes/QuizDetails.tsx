import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoRocketOutline, IoEllipsisVertical } from "react-icons/io5";
import { RxTriangleDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { FcCancel } from "react-icons/fc";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import QuizContextMenu from "./QuizContextMenu";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails({ course }: { course: any }) {
  const { cid, qid } = useParams();
  // get quiz using quiz id
  return (
    <div>
      <span className="d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary btn-md me-2">Preview</button>
        <button className="btn btn-secondary btn-md">
          <span className="d-flex justify-content-center align-items-center">
            <FaPencil className="me-1" /> Edit
          </span>
        </button>
      </span>
      <hr />
      <h1 className="mb-4">
        <b>Quiz Title</b>
      </h1>
      <div className="row mb-4">
        <div className="col-auto d-flex flex-column text-end">
          <div className="row-auto">
            <b>Quiz Type</b>
          </div>
          <div>
            <b>Points</b>
          </div>
          <div className="row">
            <b>Assignment Group</b>
          </div>
          <div className="row-auto">
            <b>Shuffle Answers</b>
          </div>
          <div className="row">
            <b>Time Limit</b>
          </div>
          <div className="row">
            <b>Multiple Attempts</b>
          </div>
          <div className="row">
            <b>View Responses</b>
          </div>
          <div className="row">
            <b>Show Correct Answers</b>
          </div>
          <div className="row">
            <b>One Question at a Time</b>
          </div>
          <div className="row">
            <b>Require Respondus LockDown Browser</b>
          </div>
          <div className="row">
            <b>Required to View Quiz Results</b>
          </div>
          <div className="row">
            <b>Webcam Required</b>
          </div>
          <div className="row">
            <b>Lock Questions After Answering</b>
          </div>
        </div>
        <div className="col text-start">
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
