import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client";
export default function ProtectedCoursesRoute({
  children,
  enrollments,
}: {
  children: any;
  enrollments: any[];
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { cid } = useParams();

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (isEnrolled) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
