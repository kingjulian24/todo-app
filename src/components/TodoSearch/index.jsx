import React from "react";
import { CiSearch } from "react-icons/ci";

const TodoInputSearch = ({ searchQuery, handleSearch }) => {
  return (
    <div className="mb-1 lg:mb-6 relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        value={searchQuery}
        onChange={handleSearch}
      />
      <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default TodoInputSearch;
