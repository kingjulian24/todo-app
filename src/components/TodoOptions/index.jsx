import React from "react";
import { useTodoesDispatchContext } from "../../hooks/TodoProvider";

const TodoOptions = () => {
  const dispatch = useTodoesDispatchContext();
  return (
    <section className="mt-2 w-full pr-4 flex mb-2">
      <button
        onClick={() => dispatch({ type: "DELETE_COMPLETED" })}
        className="option-btn"
      >
        Delete Completed
      </button>
      <button
        onClick={() => dispatch({ type: "DELETE_ALL" })}
        className="option-btn"
      >
        Delete All
      </button>
    </section>
  );
};

export default TodoOptions;
