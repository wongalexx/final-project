import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex flex-row-reverse">
      <div className="col-sm">
        <button onClick={() => dispatch(addTodo(todo))}
                className="btn btn-success flex-fill float-end" id="wd-add-todo-click"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))}
                className="btn btn-warning flex-fill me-2 float-end" id="wd-update-todo-click"> Update </button>
      </div>
      <div className="col-sm-5">
        <input defaultValue={todo.title}
                onChange={ (e) =>  dispatch(setTodo({ ...todo, title: e.target.value })) } className="form-control me-auto flex-fill float-start"/>
      </div>
    </li>
);}
