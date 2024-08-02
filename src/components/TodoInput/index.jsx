import React from "react";
import Error from "../Error";
import useTodoInputState from "../../hooks/useTodoInputState";
import TodoInputForm from "./TodoInputForm";

const TodoInput = () => {
  const { error, title, handleChange, handleSubmit } = useTodoInputState();

  return (
    <section className="w-full px-4">
      <TodoInputForm
        title={title}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {error && <Error message={error} />}
    </section>
  );
};

export default TodoInput;
