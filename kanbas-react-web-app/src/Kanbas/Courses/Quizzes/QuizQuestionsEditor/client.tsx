import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuestion = async (quizId: any, questionId: any) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${quizId}/questions/${questionId}`
  );
  return response.data;
};
export const updateQuestion = async (quiz: any, question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${quiz._id}/${question._id}`,
    question
  );
  return data;
};
