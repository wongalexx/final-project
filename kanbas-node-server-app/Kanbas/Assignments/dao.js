import model from "./model.js";
export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}
export function createAssignment(assingment) {
  delete assingment._id;
  return model.create(assingment);
}
export function deletAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
  // const { assignments } = Database;
  // Database.assignments = assignments.filter(
  //   (assingment) => assingment._id !== assignmentId
  // );
}
export function updateAssignment(assignmentId, assingmentUpdates) {
  return model.updateOne({ _id: assignmentId }, assingmentUpdates);
  // const { assignments } = Database;
  // const assingment = assignments.find(
  //   (assingment) => assingment._id === assignmentId
  // );
  // Object.assign(assingment, assingmentUpdates);
  // return assingment;
}
