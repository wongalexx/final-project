import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";

export default function AssignmentsButtons({
  assignmentID,
  deleteAssignment,
}: {
  assignmentID: string;
  deleteAssignment: (assignmentID: string) => void;
}) {
  return (
    <div className="float-end">
      <FaTrashCan
        className="me-2"
        onClick={() => deleteAssignment(assignmentID)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
