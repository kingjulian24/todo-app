import React from "react";
import { FaRegCircle, FaArchive, FaTrashAlt } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";
import { useTodoesDispatchContext } from "../../hooks/TodoProvider";
import { ActionTypes } from "../../reducers/todoReducer";

const TodoMenu = ({
  isMenuOpen,
  setShowHistory,
  showHistory,
  isFilteredByCompleted,
  setIsFilteredByCompleted,
}) => {
  const dispatch = useTodoesDispatchContext();
  const historyTitle = showHistory ? "Hide History" : "Show History";
  const completedTitle = isFilteredByCompleted ? "Show All" : "Hide Completed";
  const handleToggleCompleted = () => {
    setIsFilteredByCompleted((p) => !p);
  };

  const handleToggleHistory = () => {
    setShowHistory((p) => !p);
  };

  const handleDeleteAll = () => {
    dispatch({ type: ActionTypes.DELETE_ALL });
  };

  const handleArchiveAll = () => {
    dispatch({ type: ActionTypes.ARCHIVE_ALL });
  };

  return (
    <nav
      className={`space-y-2 lg:block ${isMenuOpen ? "block" : "hidden"} mt-4 border-b-gray-300 border-b-2 lg:pb-4`}
    >
      <MenuItem
        Icon={FaRegCircle}
        title={completedTitle}
        onClick={handleToggleCompleted}
      />
      <MenuItem
        Icon={GoHistory}
        title={historyTitle}
        onClick={handleToggleHistory}
      />
      <MenuItem Icon={IoArchiveOutline} title="Archive Completed" />
      <MenuItem
        Icon={FaArchive}
        title="Archive All"
        onClick={handleArchiveAll}
      />
      <MenuItem
        Icon={FaTrashAlt}
        title="Delete All"
        onClick={handleDeleteAll}
      />
    </nav>
  );
};

export default TodoMenu;
