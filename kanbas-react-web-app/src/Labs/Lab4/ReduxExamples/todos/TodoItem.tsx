import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo, }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item d-flex flex-row-reverse">
      <button onClick={() => dispatch(deleteTodo(todo.id))}
              className="btn btn-danger"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
              className="btn btn-primary me-2"> Edit </button>
      <span className="me-auto">
              {todo.title} </span>
    </li>
  );
}
