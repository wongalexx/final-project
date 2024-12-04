import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await enrollmentsDao.fetchEnrollments();
    res.send(enrollments);
  });
  // app.get("/api/enrollments/:userId", async (req, res) => {
  //   const { userId } = req.params;
  //   const enrollments = await enrollmentsDao.findCoursesForUser(userId);
  //   if (!enrollments || enrollments.length === 0) {
  //     return res
  //       .status(404)
  //       .send({ message: "No enrollments found for user." });
  //   }
  //   res.send(enrollments);
  // });
  // app.put("/api/enrollments/:userId/:courseId", async (req, res) => {
  //   const { userId, courseId } = req.params;
  //   const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
  //   res.send(status);
  // });
  // app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
  //   const { userId, courseId } = req.params;
  //   const status = await enrollmentsDao.unenrollUserInCourse(userId, courseId);
  //   res.send(status);
  // });
}
