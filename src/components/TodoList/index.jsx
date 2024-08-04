import React from "react";
import Todo from "./Todo";

const TodoList = ({ filteredTodos, onEdit }) => {
  return (
    <div className="space-y-4 relative">
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
