import React from "react";
import TodoItem from "../TodoItem";
import { useTodoesContext } from "../../hooks/TodoProvider";

const TodoList = () => {
  const todos = useTodoesContext();

  return (
    <section className="w-full px-4">
      <h2 className="mb-2">You have {todos.length} todo(s).</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
