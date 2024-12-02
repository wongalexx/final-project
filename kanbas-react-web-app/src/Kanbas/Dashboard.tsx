import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Enrollments from "./Enrollments";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
// import * as enrollmentClient from "./Enrollments/client";
// import {
//   setEnrollments,
//   addEnrollment,
//   deleteEnrollment,
// } from "./Enrollments/reducer";
export default function Dashboard({
  currentUser,
  // enrollments,
  // enrollUserInCourse,
  // unenrollUserInCourse,
  courses,
  course,
  // showAllCourses,
  // setShowAllCourses,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  currentUser: any;
  // enrollments: any;
  // enrollUserInCourse: (courseId: any) => void;
  // unenrollUserInCourse: (courseId: any) => void;
  courses: any[];
  course: any;
  // showAllCourses: boolean;
  // setShowAllCourses: (value: boolean) => void;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard{" "}
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>{" "}
      <hr />
      {currentUser.role === "FACULTY" && (
        <span>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            defaultValue={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            defaultValue={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </span>
      )}
      <Enrollments
        currentUser={currentUser}
        courses={courses}
        setCourse={setCourse}
        deleteCourse={deleteCourse}
        enrolling={enrolling}
        setEnrolling={setEnrolling}
        updateEnrollment={updateEnrollment}
      />
    </div>
  );
}
