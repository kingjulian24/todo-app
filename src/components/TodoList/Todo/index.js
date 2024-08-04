import React from "react";
import { FaCheckCircle, FaArchive } from "react-icons/fa";
import { useTodoesDispatchContext } from "../../../hooks/TodoProvider";
import { ActionTypes } from "../../../reducers/todoReducer";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const Todo = ({ todo, onEdit }) => {
  const dispatch = useTodoesDispatchContext();
  const checkClass = todo.completed
    ? "text-green-500 text-xl mr-4"
    : "text-gray-500 text-xl mr-4";
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow">
      <FaCheckCircle
        className={checkClass}
        onClick={() => {
          dispatch({
            type: ActionTypes.TOGGLE_COMPLETED,
            payload: { id: todo.id },
          });
        }}
      />
      <div className="flex-1" onClick={() => onEdit(todo)}>
        <h3 className="font-semibold">{todo.title}</h3>
        <p className="text-gray-600">{todo.desc}</p>
        <p className="text-gray-400 text-sm">{formatDate(todo.startDate)}</p>
      </div>
      <button className="text-gray-500 ml-4">
        <FaArchive className="text-xl" />
      </button>
    </div>
  );
};

export default Todo;
