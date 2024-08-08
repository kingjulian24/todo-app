import { useImmerReducer } from "use-immer";
import React from "react";

export const PRIORITY_SORT = {
  ASC: "ASC",
  DESC: "DESC",
  NONE: "NONE",
};

export const PRIORITY_SORT_MAP = {
  low: 0,
  medium: 1,
  high: 2,
};

export const ActionTypes = {
  SORT_PRIORITY: "SORT_PRIORITY",
  TOGGLE_FILTER_COMPLETED: "TOGGLE_FILTER_COMPLETED",
  TOGGLE_FILTER_ARCHIVED: "TOGGLE_FILTER_ARCHIVED",
};

const todoMenuReducer = (draft, action) => {
  switch (action.type) {
    case ActionTypes.SORT_PRIORITY:
      draft.sortPriority = action.payload;
      break;
    case ActionTypes.TOGGLE_FILTER_COMPLETED:
      draft.filterCompleted = !draft.filterCompleted;
      break;
    case ActionTypes.TOGGLE_FILTER_ARCHIVED:
      draft.filterArchived = !draft.filterArchived;
      break;
    default:
      return draft;
  }
};

const useTodoMenu = () => {
  const initialState = {
    sortPriority: PRIORITY_SORT.NONE,
    filterCompleted: false,
    filterArchived: false,
  };
  const [menuState, dispatch] = useImmerReducer(todoMenuReducer, initialState);

  const menuActions = React.useMemo(
    () => ({
      setSortPriority: (priority) =>
        dispatch({ type: ActionTypes.SORT_PRIORITY, payload: priority }),
      toggleFilterCompleted: () =>
        dispatch({ type: ActionTypes.TOGGLE_FILTER_COMPLETED }),
      toggleFilterArchived: () =>
        dispatch({ type: ActionTypes.TOGGLE_FILTER_ARCHIVED }),
    }),
    [dispatch]
  );

  return {
    menuState,
    menuActions,
  };
};

export default useTodoMenu;
