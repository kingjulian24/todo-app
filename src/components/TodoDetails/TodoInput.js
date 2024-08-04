import React from "react";

const TodoInput = ({ handleChange, todo }) => {
  return (
    <input
      type="text"
      name="title"
      value={todo.title}
      onChange={handleChange}
      placeholder="Title"
      className="w-full p-2 border rounded"
      required
    />
  );
};

export default TodoInput;
