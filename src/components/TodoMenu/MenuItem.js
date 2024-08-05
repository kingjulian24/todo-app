import React from "react";

const MenuItem = ({ title, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-start space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out"
    >
      {children}
      <span>{title}</span>
    </button>
  );
};

export default MenuItem;
