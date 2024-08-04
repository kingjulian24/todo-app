import React from "react";

const MenuItem = ({ Icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-start space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out"
  >
    <Icon className="text-xl" />
    <span>{title}</span>
  </button>
);

export default MenuItem;
