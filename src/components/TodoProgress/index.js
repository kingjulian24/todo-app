import React from "react";
import { useTodoesContext } from "../../hooks/TodoProvider";

const TodoProgress = () => {
  const todos = useTodoesContext();
  const completedTodos = todos.filter(
    (todo) => todo.completed && !todo.archived
  ).length;
  const totalTodos = todos.filter((todo) => !todo.archived).length;
  const progress = Math.floor((completedTodos / totalTodos) * 100);
  const percentage = isNaN(progress) ? 100 : progress;
  const backgroundColor =
    percentage === 0 ? "rgb(229 231 235)" : "rgb(74 222 128)";

  return (
    <div className="mb-6 lg:block hidden border-b-gray-300 border-b-2 pb-4">
      <h2 className="text-lg font-semibold mb-2">Progress</h2>
      <div className="bg-gray-200 rounded-lg relative">
        <div
          className="bg-green-400 p-5 rounded-lg text-center"
          style={{ width: percentage + "%", backgroundColor }}
        >
          <p className="absolute top-2 left-1/2 -translate-x-1/2 font-bold">
            {percentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoProgress;
