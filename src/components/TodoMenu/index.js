import React from "react";
import { FaRegCircle, FaArchive, FaTrashAlt } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";
import { useTodoesDispatchContext } from "../../hooks/TodoProvider";
import { ActionTypes } from "../../reducers/todoReducer";

const TodoMenu = ({ isMenuOpen, setShowHistory, showHistory }) => {
  const dispatch = useTodoesDispatchContext();
  const historyTitle = showHistory ? "Hide History" : "Show History";
  return (
    <nav
      className={`space-y-2 lg:block ${isMenuOpen ? "block" : "hidden"} mt-4 border-b-gray-300 border-b-2 lg:pb-4`}
    >
      <MenuItem Icon={FaRegCircle} title="Active" />
      <MenuItem
        Icon={GoHistory}
        title={historyTitle}
        onClick={() => setShowHistory((p) => !p)}
      />
      <MenuItem Icon={IoArchiveOutline} title="Archive Completed" />
      <MenuItem Icon={FaArchive} title="Archive All" />
      <MenuItem
        Icon={FaTrashAlt}
        title="Delete All"
        onClick={() => {
          dispatch({ type: ActionTypes.DELETE_ALL });
        }}
      />
    </nav>
  );
};

export default TodoMenu;
