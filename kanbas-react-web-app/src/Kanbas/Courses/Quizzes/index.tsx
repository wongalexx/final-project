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

export default function Quizzes({ course }: { course: any }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  //const quizzes: any[] = [];
  const quizzes = [
    {
      title: "Q1 - HTML",
      course: "",
      quizType: "",
      points: 100,
      assignmentGroup: "",
      shuffleAnswers: true,
      timeLimit: 30,
      multipleAttempts: false,
      attemptsAllowed: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: true,
      availableFromDate: "2024-11-01T00:00:00",
      availableUntilDate: "2024-11-10T23:59:59",
      due: "2024-11-10T23:59:59",
      questions: [],
      published: true,
    },
    {
      title: "Q2 - CSS",
      course: "",
      quizType: "",
      points: 50,
      assignmentGroup: "",
      shuffleAnswers: false,
      timeLimit: 15,
      multipleAttempts: true,
      attemptsAllowed: 3,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: false,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      availableFromDate: "2024-12-01T00:00:00",
      availableUntilDate: "2024-12-10T23:59:59",
      due: "2024-12-10T23:59:59",
      questions: [],
      published: true,
    },
    {
      title: "EXAM 1 FA 23",
      course: "",
      quizType: "",
      points: 75,
      assignmentGroup: "",
      shuffleAnswers: false,
      timeLimit: 15,
      multipleAttempts: true,
      attemptsAllowed: 3,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: false,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      availableFromDate: "2024-12-25T00:00:00",
      availableUntilDate: "2024-12-26T23:59:59",
      due: "2024-12-26T23:59:59",
      questions: [],
      published: true,
    },
    {
      title: "Q3 - JS, ES6",
      course: "",
      quizType: "",
      points: 100,
      assignmentGroup: "",
      shuffleAnswers: true,
      timeLimit: 30,
      multipleAttempts: false,
      attemptsAllowed: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: true,
      availableFromDate: "2024-12-25T00:00:00",
      availableUntilDate: "2024-12-26T23:59:59",
      due: "2024-12-26T23:59:59",
      questions: [],
      published: false,
    },
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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
      {quizzes.length === 0 ? (
        <b>Please click the 'Add Quiz' button (+ Quiz) to add a new quiz.</b>
      ) : (
        <ul id="wd-assignments" className="list-group rounded-0">
          <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
            <div
              id="wd-assignments-title"
              className="wd-title p-3 ps-2 bg-secondary"
            >
              <RxTriangleDown />
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
                      <IoRocketOutline color="green" />
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
                            {quiz.points}pts | {quiz.questions.length}
                          </span>
                        </span>
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <div className="col d-flex justify-content-between align-items-center">
                        {/* ON CLICK NEEDS TO MAKE IT SO IT IS PUBLISHED */}
                        {quiz.published ? <GreenCheckmark /> : <FcCancel />}
                        <QuizContextMenu quiz={quiz} />
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
