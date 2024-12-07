import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleTable from "./People/Table";
import * as courseClient from "./client";
import { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreviewScreen from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const course = courses.find((course) => course._id === cid);
  const fetchUsers = async () => {
    try {
      const usersInCourse = await courseClient.findUsersForCourse(course._id);
      setUsers(usersInCourse);
    } catch (error) {
      console.error(error);
    }
  };
  const { pathname } = useLocation();
  useEffect(() => {
    fetchUsers();
  }, [cid]);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home course={course} />} />
            <Route path="Modules" element={<Modules course={course} />} />
            <Route
              path="Assignments"
              element={<Assignments course={course} />}
            />
            <Route
              path="Assignments/:aid"
              element={<AssignmentEditor course={course} />}
            />
            <Route path="Quizzes" element={<Quizzes course={course} />} />
            <Route
              path="Quizzes/:qid"
              element={<QuizDetails course={course} />}
            />
            <Route
              path="Quizzes/:qid/:qtitle"
              element={<QuizEditor course={course} />}
            />
            <Route
              path="Quizzes/:qid/Preview"
              element={<QuizPreviewScreen />}
            />

            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
