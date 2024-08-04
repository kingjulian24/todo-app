import React from "react";
import { useTodoesContext } from "../../hooks/TodoProvider";
import Todo from "./Todo";

const TodoList = ({ onEdit }) => {
  const todos = useTodoesContext();

  return (
    <div className="space-y-4 relative">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
