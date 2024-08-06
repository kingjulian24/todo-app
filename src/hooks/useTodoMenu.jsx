import { useImmerReducer } from "use-immer";
import React from "react";

export const PRIORITY_SORT = {
  ASC: "ASC",
  DESC: "DESC",
  NONE: "NONE",
};

const PRIORITY_SORT_MAP = {
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

const useTodoMenu = (todos, setFilteredTodos) => {
  const initialState = {
    sortPriority: PRIORITY_SORT.NONE,
    filterCompleted: false,
    filterArchived: false,
  };
  const [state, dispatch] = useImmerReducer(todoMenuReducer, initialState);
  React.useEffect(() => {
    let updatedTodos = todos;
    console.log(updatedTodos);

    if (state.filterCompleted) {
      updatedTodos = updatedTodos.filter((todo) => !todo.completed);
    }

    if (state.filterArchived) {
      updatedTodos = updatedTodos.filter((todo) => todo.archived);
    } else {
      updatedTodos = updatedTodos.filter((todo) => !todo.archived);
    }

    if (state.sortPriority !== PRIORITY_SORT.NONE) {
      updatedTodos = [
        ...updatedTodos.sort((a, b) => {
          if (state.sortPriority === PRIORITY_SORT.ASC) {
            return (
              PRIORITY_SORT_MAP[a.priority] - PRIORITY_SORT_MAP[b.priority]
            );
          } else if (state.sortPriority === PRIORITY_SORT.DESC) {
            return (
              PRIORITY_SORT_MAP[b.priority] - PRIORITY_SORT_MAP[a.priority]
            );
          }
          return 0;
        }),
      ];
    }

    setFilteredTodos(updatedTodos);
  }, [state, todos, setFilteredTodos]);

  const actions = React.useMemo(
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
    state,
    actions,
  };
};

export default useTodoMenu;
