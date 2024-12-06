import { useParams } from "react-router";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails({ course }: { course: any }) {
  const { cid, qid } = useParams();
  // get quiz using quiz id
  const quiz = {
    _id: 1,
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
        <b>Quiz Title</b>
      </h1>
      <div className="row mb-4">
        <div className="col-auto d-flex flex-column text-end">
          <div className="row-auto">
            <b>Quiz Type</b>
          </div>
          <div>
            <b>Points</b>
          </div>
          <div className="row">
            <b>Assignment Group</b>
          </div>
          <div className="row-auto">
            <b>Shuffle Answers</b>
          </div>
          <div className="row">
            <b>Time Limit</b>
          </div>
          <div className="row">
            <b>Multiple Attempts</b>
          </div>
          <div className="row">
            <b>View Responses</b>
          </div>
          <div className="row">
            <b>Show Correct Answers</b>
          </div>
          <div className="row">
            <b>One Question at a Time</b>
          </div>
          <div className="row">
            <b>Require Respondus LockDown Browser</b>
          </div>
          <div className="row">
            <b>Required to View Quiz Results</b>
          </div>
          <div className="row">
            <b>Webcam Required</b>
          </div>
          <div className="row">
            <b>Lock Questions After Answering</b>
          </div>
        </div>
        <div className="col text-start">
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
          <div className="row">Get Quiz's Info</div>
        </div>
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
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
            <td>Get Quiz's Info</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
