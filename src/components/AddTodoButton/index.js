import React from "react";

const AddTodoButton = ({ toggleAdding }) => (
  <button
    onClick={toggleAdding}
    className="bg-green-500 rounded-full fixed bottom-5 left-1/2 lg:left-5/6 -translate-x-5/6 z-10 shadow-xl"
  >
    <svg
      className="w-16 h-16 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

export default AddTodoButton;
