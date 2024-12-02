import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client";
export default function ProtectedCoursesRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { cid } = useParams();
  // const [courses, setCourses] = useState<any[]>([]);

  // const findCoursesForUser = async () => {
  //   try {
  //     const courses = await userClient.findCoursesForUser(currentUser._id);
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  // useEffect(() => {
  //   findCoursesForUser();
  // }, [currentUser]);

  if (isEnrolled) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
