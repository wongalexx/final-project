interface Quiz {
  _id: string;
  points: number;
}

interface QuizQuestion {
  title: string;
  _id: string;
  content: string;
  score: number;
  explanation: string;
  questionType: "multiple-choice" | "fill-in-the-blank" | "true-false";
  choices?: string[];
  correctAnswers: string[];
}

// SAMPLE DATA FOR INITIAL TESTING
const quiz: Quiz = {
  _id: "quiz123",
  points: 50,
};
const quizQuestions: QuizQuestion[] = [
  {
    title: "Capital of France",
    _id: "question1",
    content: "What is the capital of France?",
    score: 10,
    explanation:
      "The capital of France is Paris, known for its art, fashion, and culture.",
    questionType: "multiple-choice",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswers: ["Paris"],
  },
  {
    title: "Photosynthesis Equation",
    _id: "question2",
    content:
      "Fill in the blanks: Photosynthesis uses ___ and ___ to produce glucose and oxygen.",
    score: 15,
    explanation: "Photosynthesis requires sunlight, water, and carbon dioxide.",
    questionType: "fill-in-the-blank",
    correctAnswers: ["sunlight", "water"],
  },
  {
    title: "True or False Question",
    _id: "question3",
    content: "The sun is a star.",
    score: 5,
    explanation: "The sun is indeed a star at the center of our solar system.",
    questionType: "true-false",
    correctAnswers: ["true"],
  },
];

export default function QuizQuestionEditor() {
  return (
    <div>
      <h1>Quiz Question Editor</h1>
      <hr />
    </div>
  );
}
