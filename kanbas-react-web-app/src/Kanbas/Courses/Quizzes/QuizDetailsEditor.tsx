export default function QuizDetailsEditor({ quiz }: { quiz: any }) {
  function formatToDatetimeLocal(date: string | Date | undefined): string {
    if (!date) return "";
    const formattedDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(formattedDate.getTime())) return "";

    return formattedDate.toISOString().slice(0, 16);
  }

  return (
    <div id="wd-quizzes-details-editor">
      <div className="col-8">
        <input
          id="wd-name"
          className="form-control mb-3"
          value={quiz.title}
          placeholder="Enter quiz title..."
        />
      </div>
      <label htmlFor="wd-instructions">Quiz Instructions:</label>
      <textarea
        className="form-control mb-3"
        id="wd-instructions"
        value={quiz.instructions}
      />
      <div className="row mb-4">
        <div className="row mb-2">
          <div className="col-4 d-flex flex-column text-end">Quiz Type</div>
          <div className="col-4 flex-column">
            <select
              className="form-select w-100"
              id="wd-type"
              value={quiz.quizType}
            >
              <option value={"Graded Quiz"}>Graded Quiz</option>
              <option value={"Practice Quiz"}>Practice Quiz</option>
              <option value={"Graded Survey"}>Graded Survey</option>
              <option value={"Ungraded Survey"}>Ungraded Survey</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 d-flex flex-column text-end">
            Assignment Group
          </div>
          <div className="col-4 flex-column">
            <select
              className="form-select w-100"
              id="wd-type"
              value={quiz.assignmentGroup}
            >
              <option value={"Quizzes"}>Quizzes</option>
              <option value={"Exams"}>Exams</option>
              <option value={"Assignments"}>Assignments</option>
              <option value={"Project"}>Project</option>
            </select>
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col-4 d-flex flex-column text-end"></div>
          <div className="col d-flex flex-column">
            Options
            <div className="form-check mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="shuffleAnswers"
                checked={quiz.shuffleAnswers}
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">
                Shuffle Answers
              </label>
            </div>
            <div className="d-flex align-items-center">
              <div className="form-check me-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="timeLimit"
                  checked={quiz.timeLimit}
                />
                <label className="form-check-label" htmlFor="timeLimit">
                  Time Limit
                </label>
              </div>
              <input
                id="wd-quiz-minutes"
                className="form-control me-2"
                style={{ width: "60px" }}
                value={quiz.timeLimit}
              />
              <span>Minutes </span>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="allowMultipleAttempts"
                    checked={quiz.multipleAttempts}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="allowMultipleAttempts"
                  >
                    Allow Multiple Attempts
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4"></div>
          <div className="col-auto">
            <span className="float-start">Assign</span>
          </div>
          <div className="col d-flex flex-column">
            <div className="forms">
              <div className="mb-3">
                <label htmlFor="wd-assign-to">
                  <b>Assign to</b>
                </label>
                <input
                  className="form-control"
                  id="wd-assign-to"
                  value={"Everyone"}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">
                  <b>Due</b>
                </label>
                <div className="input-group">
                  <input
                    id="wd-due-date"
                    type="datetime-local"
                    className="form-control"
                    value={formatToDatetimeLocal(quiz.due)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col text-left">
                  <label className="form-label" htmlFor="wd-available-from">
                    <b>Available from</b>
                  </label>
                  <input
                    type="datetime-local"
                    id="wd-available-from"
                    className="form-control"
                    value={formatToDatetimeLocal(quiz.availableFromDate)}
                  />
                </div>
                <div className="col text-right">
                  <label className="form-label" htmlFor="wd-available-until">
                    <b>Until</b>
                  </label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="wd-available-until"
                    value={formatToDatetimeLocal(quiz.availableUntilDate)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
