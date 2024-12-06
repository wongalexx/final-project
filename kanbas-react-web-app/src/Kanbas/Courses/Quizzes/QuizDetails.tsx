import { useParams } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function QuizDetails({ course }: { course: any }) {
  const { cid, qid } = useParams();
  // get quiz using quiz id
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  // const quiz = {
  //   _id: 1,
  //   title: "Q1 - HTML",
  //   course: "",
  //   quizType: "",
  //   points: 100,
  //   assignmentGroup: "",
  //   shuffleAnswers: true,
  //   timeLimit: 30,
  //   multipleAttempts: false,
  //   attemptsAllowed: 1,
  //   showCorrectAnswers: "",
  //   accessCode: "",
  //   oneQuestionAtATime: true,
  //   webcamRequired: false,
  //   lockQuestionsAfterAnswering: true,
  //   availableFromDate: "2024-11-01T00:00:00",
  //   availableUntilDate: "2024-11-10T23:59:59",
  //   due: "2024-11-10T23:59:59",
  //   questions: [],
  //   published: true,
  // };
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

  return (
    <div>
      <span className="d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary btn-md me-2">Preview</button>
        <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/${quiz.title}`}>
          <button className="btn btn-secondary btn-md">
            <span className="d-flex justify-content-center align-items-center">
              <FaPencil className="me-1" /> Edit
            </span>
          </button>
        </a>
      </span>
      <hr />
      <h1 className="mb-4">
        <b>{quiz.title}</b>
      </h1>
      <div className="col-6">
        <div className="row">
          <div className="col-6 text-end">
            <b>Quiz Type</b>
          </div>
          <div className="col-6 text-start">Get Quiz's Info</div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Points</b>
          </div>
          <div className="col-6 text-start">Get Quiz's Info</div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Points</b>
            </div>
            <div className="col-6 text-start">Get Quiz's Info</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Assignment Group</b>
            </div>
            <div className="col-6 text-start">Get Quiz's Info</div>
            <div className="col-6 text-end">
              <b>Assignment Group</b>
            </div>
            <div className="col-6 text-start">Get Quiz's Info</div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <b>Shuffle Answers</b>
            </div>
            <div className="col-6 text-start">Get Quiz's Info</div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Shuffle Answers</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Time Limit</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Time Limit</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Multiple Attempts</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Multiple Attempts</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>View Responses</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>View Responses</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Show Correct Answers</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Show Correct Answers</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>One Question at a Time</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>One Question at a Time</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Require Respondus LockDown Browser</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Require Respondus LockDown Browser</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Required to View Quiz Results</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Required to View Quiz Results</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Webcam Required</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
              <div className="col-6 text-end">
                <b>Webcam Required</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <b>Lock Questions After Answering</b>
              </div>
              <div className="col-6 text-start">Get Quiz's Info</div>
            </div>
          </div>
        </div>
        <div className="col text-start">
          <div className="row">{quiz.quizType}</div>
          <div className="row">{quiz.points}</div>
          <div className="row">{quiz.assignmentGroup}</div>
          <div className="row">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
          <div className="row">{quiz.timeLimit}</div>
          <div className="row">{quiz.multipleAttempts ? "Yes" : "No"}</div>
          <div className="row">{quiz.quizType}</div>
          <div className="row">{quiz.quizType}</div>
          {/* {multipleAttempt, viewResponses, showCorrectAnswers} */}
          <div className="row">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
          <div className="row">{quiz.quizType}</div>
          <div className="row">{quiz.showCorrectAnswers}</div>
          {/* {} */}
          <div className="row">{quiz.webcamRequired}</div>
          <div className="row">{quiz.lockQuestionsAfterAnswering}</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Due</th>
              <th scope="col">For</th>
              <th scope="col">Available from</th>
              <th scope="col">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due}</td>
              <td>Get Quiz's Info</td>
              <td>{quiz.availableFromDate}</td>
              <td>{quiz.availableUntilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
