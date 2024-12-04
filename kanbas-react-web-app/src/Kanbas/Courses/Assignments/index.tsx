import { AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { RxTriangleDown } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import AssignmentsButtons from "./AssignmentsButtons";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
export default function Assignments({ course }: { course: any }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      course.number as string
    );
    dispatch(setAssignments(assignments));
  };
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  const { cid, aid } = useParams();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );
  const handleDeleteConfirmation = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };
  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };
  const handleDeleteAssignment = () => {
    if (assignmentToDelete) {
      removeAssignment(assignmentToDelete);
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid, course, dispatch]);
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
              placeholder="Search..."
            />
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="col-md-6 text-end">
            <button
              id="wd-add-assignment-group"
              className="btn btn-secondary btn-lg me-1"
            >
              <AiOutlinePlus /> Group
            </button>
            <a href={`#/Kanbas/Courses/${cid}/Assignments/${aid}`}>
              <button id="wd-add-assignment" className="btn btn-danger btn-lg">
                <AiOutlinePlus /> Assignment
              </button>
            </a>
          </div>
        )}
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-assignments-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" />
            <RxTriangleDown />
            <b>ASSIGNMENTS</b>
            {currentUser.role === "FACULTY" && (
              <div className="float-end">
                <button
                  id="wd-assignments-title-grade-percent"
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  disabled
                >
                  40% of Total
                </button>
                <FaPlus />
                <IoEllipsisVertical className="fs-4" />
              </div>
            )}
          </div>
          {assignments.map((assignment: any) => (
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment color="green" />
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
                {currentUser.role === "FACULTY" ? (
                  <div className="col d-flex justify-content-center align-items-center">
                    <AssignmentsButtons
                      assignmentID={assignment._id}
                      deleteAssignment={() =>
                        handleDeleteConfirmation(assignment._id)
                      }
                    />
                  </div>
                ) : (
                  <span className="col text-right"> </span>
                )}
              </div>
            </li>
          ))}
        </li>
      </ul>
      {showDeleteDialog && (
        <div className="modal show" style={{ display: "block", zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <p>Are you sure you want to delete this assignment?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  No, Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAssignment}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
