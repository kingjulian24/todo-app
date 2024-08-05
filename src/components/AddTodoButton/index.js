import React from "react";

const AddTodoButton = ({ toggleAdding }) => (
  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ml-1">
    <button
      onClick={toggleAdding}
      className="bg-green-500 rounded-full z-10 shadow-xl"
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
  </div>
);

export default AddTodoButton;
