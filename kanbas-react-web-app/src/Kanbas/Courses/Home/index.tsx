import { useSelector } from "react-redux";
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home({ course }: { course: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-4">
        <Modules course={course} />
      </div>
      <div className="d-none d-md-block">
        {currentUser.role === "FACULTY" && <CourseStatus />}
      </div>
    </div>
  );
}
