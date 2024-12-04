import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoRocketOutline, IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { RxTriangleDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { assignments } from "../../Database";
import AssignmentsButtons from "../Assignments/AssignmentsButtons";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Quizzes({ course }: { course: any }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const quizzes = [];
  return (
    <div id="wd-assignments">
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <CiSearch />
            </span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control"
              placeholder="Search for Quiz"
            />
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="col-md-6 text-end">
            <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
              <button id="wd-add-assignment" className="btn btn-danger btn-lg">
                <AiOutlinePlus /> Quiz
              </button>
            </a>
            <button
              id="wd-add-assignment-group"
              className="btn btn-secondary btn-lg ms-1"
            >
              <IoEllipsisVertical className="fs-4" />
            </button>
          </div>
        )}
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-assignments-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <RxTriangleDown />
            <b>Assignment Quizzes</b>
          </div>
          {assignments.map((assignment: any) => (
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                  <IoRocketOutline color="green" />
                </div>
                <div className="col-9 text-left p-0">
                  <div className="row">
                    {currentUser.role === "FACULTY" ? (
                      <a
                        className="wd-assignment-link"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      >
                        <b>{assignment.title}</b>
                      </a>
                    ) : (
                      <b className="wd-assignment-link">{assignment.title}</b>
                    )}
                  </div>
                  <div className="row">
                    <span className="wd-assignment-description">
                      <span className="red-font me-2">Multiple Modules </span>
                      <span className="grey-font">
                        | <b>Not available until</b>{" "}
                        {assignment.availableFromDate} |
                      </span>
                    </span>
                  </div>
                  <div className="row">
                    <span className="wd-assignment-description">
                      <span className="grey-font">
                        <b>Due</b> {assignment.due} | {assignment.points}pts
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <GreenCheckmark />
                  <IoEllipsisVertical style={{ marginTop: "-4px" }} />
                </div>
              </div>
            </li>
          ))}
        </li>
      </ul>
    </div>
  );
}
