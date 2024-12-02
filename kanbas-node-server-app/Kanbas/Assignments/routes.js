import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    res.send(status);
  });
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignmentsDao.deletAssignment(assignmentId);
    res.send(status);
  });
}
