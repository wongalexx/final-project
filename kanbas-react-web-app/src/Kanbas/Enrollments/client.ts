import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};
// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
// export const getUserEnrollments = async (userId: any) => {
//   const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
//   return data;
// };
// export const enrollUserInCourse = async (userId: any, courseId: any) => {
//   const { data } = await axios.put(
//     `${ENROLLMENTS_API}/${userId}/${courseId}`,
//     courseId
//   );
//   return data;
// };
// export const unenrollUserInCourse = async (userId: any, courseId: any) => {
//   const { data } = await axios.delete(
//     `${ENROLLMENTS_API}/${userId}/${courseId}`,
//     courseId
//   );
//   return data;
// };
