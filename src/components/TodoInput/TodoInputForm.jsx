import React from "react";

const TodoInputForm = ({ title, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enter a task"
      value={title}
      onChange={handleChange}
      className="w-full p-2 rounded-lg"
    />
  </form>
);

export default TodoInputForm;
