import { AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoRocketOutline, IoEllipsisVertical } from "react-icons/io5";
import { RxTriangleDown } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { FcCancel } from "react-icons/fc";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useEffect, useState } from "react";
import QuizContextMenu from "./QuizContextMenu";
import * as coursesClient from "../client";
import { queries } from "@testing-library/react";
import { setQuizzes } from "./reducer";
import * as quizClient from "./client";

export default function Quizzes({ course }: { course: any }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { cid } = useParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  const fetchQuizzes = async () => {
    //const quiz = await coursesClient.findQuizzesForCourse(cid as string);
    const quiz = await coursesClient.findQuizzesForCourse(course.number);

    dispatch(setQuizzes(quiz));
  };

  const deleteQuiz = async (qid: string) => {
    await quizClient.deleteQuiz(qid);
  };
  useEffect(() => {
    fetchQuizzes();
  }, [cid, quizzes]);

  const formatDate = (newDate: string | number | Date) => {
    const date = new Date(newDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const fetchAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableFromDate = new Date(quiz.availableFromDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    if (currentDate < availableFromDate) {
      return (
        <span>
          <b>Not available until</b> {formatDate(availableFromDate)}
        </span>
      );
    } else if (currentDate > availableUntilDate) {
      return <b>Closed</b>;
    } else {
      return <b>Available</b>;
    }
  };

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
            <a href={`#/Kanbas/Courses/${cid}/Quizzes/new`}>
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
      <hr />
      {quizzes.length === 0 ? (
        <b>Click the 'Add Quiz' button (+ Quiz) to add a new quiz.</b>
      ) : (
        <ul id="wd-assignments" className="list-group rounded-0">
          <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
            <div
              id="wd-assignments-title"
              className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-start align-items-center"
            >
              <RxTriangleDown className="me-1" />
              <b>Assignment Quizzes</b>
            </div>

            {quizzes
              .filter((quiz: any) => {
                return currentUser.role === "FACULTY" || quiz.published;
              })
              .map((quiz: any) => (
                <li
                  className="wd-assignment-list-item list-group-item p-3 ps-1"
                  key={quiz._id}
                >
                  <div className="row">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                      <IoRocketOutline className="fs-3" color="green" />
                    </div>
                    <div className="col-9 text-left p-0">
                      <div className="row">
                        {currentUser.role === "FACULTY" ? (
                          <a
                            className="wd-assignment-link"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                          >
                            <b>{quiz.title}</b>
                          </a>
                        ) : (
                          <b className="wd-assignment-link">{quiz.title}</b>
                        )}
                      </div>
                      <div className="row">
                        <span className="wd-assignment-description">
                          <span className="grey-font">
                            {fetchAvailability(quiz)} |
                          </span>
                          <span className="grey-font">
                            {" "}
                            <b>Due</b> {formatDate(new Date(quiz.due))} |{" "}
                            {quiz.points}pts | GET QUESTIONS questions
                          </span>
                        </span>
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <div className="col d-flex justify-content-end align-items-center">
                        {/* ON CLICK NEEDS TO MAKE IT SO IT IS PUBLISHED */}
                        {quiz.published ? (
                          <GreenCheckmark />
                        ) : (
                          <FcCancel className="fs-3" />
                        )}
                        <QuizContextMenu quiz={quiz} deleteQuiz={deleteQuiz} />
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </li>
        </ul>
      )}
    </div>
  );
}
