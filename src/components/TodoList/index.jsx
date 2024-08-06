import React from "react";
import Todo from "./Todo";

const TodoList = ({ filteredTodos, onEdit }) => {
  const sortByIncompleted = [...filteredTodos];
  sortByIncompleted.sort((a, b) => a.completed - b.completed);
  return (
    <div className="space-y-4 relative">
      {sortByIncompleted.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
