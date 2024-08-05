import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { PRIORITY_SORT } from "../../hooks/useTodoAppState";

const SortPriorityIcon = ({ sortpriority }) => {
  const getIcon = () => {
    switch (sortpriority) {
      case PRIORITY_SORT.ASC:
        return FaSortDown;
      case PRIORITY_SORT.DESC:
        return FaSortUp;
      default:
        return FaSort;
    }
  };
  const Icon = getIcon();
  return <Icon />;
};

export default SortPriorityIcon;
