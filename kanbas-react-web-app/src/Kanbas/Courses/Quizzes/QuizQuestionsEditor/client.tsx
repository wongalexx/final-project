import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuestion = async (
  quizId: string | undefined,
  questionId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${quizId}/questions/${questionId}`
  );
  return response.data;
};
export const updateQuestion = async (quiz: any, questionId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${quiz._id}`,
    quiz
  );
  return data;
};
