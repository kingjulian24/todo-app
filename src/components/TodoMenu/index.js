import React from "react";
import { FaRegCircle, FaArchive, FaTrashAlt } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";
import { useTodoesDispatchContext } from "../../hooks/TodoProvider";
import { ActionTypes } from "../../reducers/todoReducer";
import SortPriorityIcon from "./SortPriorityIcon";
import { PRIORITY_SORT } from "../../hooks/useTodoAppState";

const TodoMenu = ({
  isMenuOpen,
  setShowHistory,
  showHistory,
  isFilteredByCompleted,
  setIsFilteredByCompleted,
  sortPriority,
  setSortPriority,
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

  const handleArchiveCompleted = () => {
    dispatch({ type: ActionTypes.ARCHIVE_COMPLETED });
  };

  const handleSortByPriority = () => {
    if (sortPriority === PRIORITY_SORT.NONE) {
      setSortPriority(PRIORITY_SORT.DESC);
    } else if (sortPriority === PRIORITY_SORT.ASC) {
      setSortPriority(PRIORITY_SORT.DESC);
    } else if (sortPriority === PRIORITY_SORT.DESC) {
      setSortPriority(PRIORITY_SORT.ASC);
    }
  };

  return (
    <nav
      className={`space-y-2 lg:block ${isMenuOpen ? "block" : "hidden"} mt-4 border-b-gray-300 border-b-2 lg:pb-4`}
    >
      <MenuItem
        Icon={false}
        title="Sort by priority"
        onClick={handleSortByPriority}
      >
        <SortPriorityIcon sortpriority={sortPriority} />
      </MenuItem>
      <MenuItem title={completedTitle} onClick={handleToggleCompleted}>
        <FaRegCircle />
      </MenuItem>
      <MenuItem title={historyTitle} onClick={handleToggleHistory}>
        <GoHistory />
      </MenuItem>
      <MenuItem title="Archive Completed" onClick={handleArchiveCompleted}>
        <IoArchiveOutline />
      </MenuItem>
      <MenuItem title="Archive All" onClick={handleArchiveAll}>
        <FaArchive />
      </MenuItem>
      <MenuItem title="Delete All" onClick={handleDeleteAll}>
        <FaTrashAlt />
      </MenuItem>
    </nav>
  );
};

export default TodoMenu;
