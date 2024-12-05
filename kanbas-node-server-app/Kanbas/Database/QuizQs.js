export default [
  {
    _id: "question_id1", // Unique ID for the question
    quiz: "quiz_id", // Reference to parent quiz
    title: "Question Title",
    points: 5,
    question: "What is the capital of France?",
    type: "Multiple Choice", // Enum values
    choices: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
    correctAnswer: "Paris",
  },
];
