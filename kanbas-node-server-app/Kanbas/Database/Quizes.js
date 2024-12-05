export default [
  {
    _id: "123",
    title: "Quiz Title1",
    course: "courseID1",
    quizType: "Graded Quiz",
    points: 50,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: "Never",
    accessCode: "optional_code",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    availableFromDate: "2024-01-01T00:00:00.000Z",
    availableUntilDate: "2024-01-31T23:59:59.999Z",
    due: "2024-01-15T23:59:59.999Z",
    questions: ["question_id1", "question_id2"], // Array of references
    published: false,
  },
];
