// const comment = {
//   id: 1,
//   text: "This is a comment",
//   date: Date.now(),
// };

// const todo = {
//   id: 1,
//   title: "Buy milk",
//   completed: false,
//   startDate: Date.now,
//   endDate: null,
//   priority: "low",
//   tags: ["shopping", "groceries"],
//   comments: [],
//   desc: "",
//   archived: false,
//   options: {}
// };
export const ActionTypes = {
  ADD: "ADD",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
  TOGGLE_ARCHIVED: "TOGGLE_ARCHIVED",
  FILTER_BY_COMPLETED: "FILTER_BY_COMPLETED",
  FILTER_BY_ARCHIVED: "FILTER_BY_ARCHIVED",
  DELETE_COMPLETED: "DELETE_COMPLETED",
  DELETE_ALL: "DELETE_ALL",
};

const todoReducer = (draft, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      draft.push(action.payload);
      break;
    case ActionTypes.DELETE:
      return draft.filter((todo) => todo.id !== action.payload.id);
    case ActionTypes.UPDATE:
      const {
        id,
        title,
        completed,
        startDate,
        endDate,
        priority,
        tags,
        comments,
        desc,
        archived,
        options,
      } = action.payload;
      const todoToUpdate = draft.find((t) => t.id === id);
      if (todoToUpdate) {
        todoToUpdate.title = title !== undefined ? title : todoToUpdate.title;
        todoToUpdate.completed =
          completed !== undefined ? completed : todoToUpdate.completed;
        todoToUpdate.startDate =
          startDate !== undefined ? startDate : todoToUpdate.startDate;
        todoToUpdate.endDate =
          endDate !== undefined ? endDate : todoToUpdate.endDate;
        todoToUpdate.priority =
          priority !== undefined ? priority : todoToUpdate.priority;
        todoToUpdate.tags = tags !== undefined ? tags : todoToUpdate.tags;
        todoToUpdate.comments =
          comments !== undefined ? comments : todoToUpdate.comments;
        todoToUpdate.desc = desc !== undefined ? desc : todoToUpdate.desc;
        todoToUpdate.archived =
          archived !== undefined ? archived : todoToUpdate.archived;
        todoToUpdate.options =
          options !== undefined ? options : todoToUpdate.options;
      }
      break;
    case ActionTypes.TOGGLE_COMPLETED:
      const todoToToggle = draft.find((todo) => todo.id === action.payload.id);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
      break;
    case ActionTypes.TOGGLE_ARCHIVED:
      const todoToToggleArchived = draft.find(
        (todo) => todo.id === action.payload
      );
      if (todoToToggleArchived) {
        todoToToggleArchived.archived = !todoToToggleArchived.archived;
      }
      break;
    case ActionTypes.FILTER_BY_COMPLETED:
      return draft.filter(
        (todo) => todo.completed === action.payload.completed
      );
    case ActionTypes.FILTER_BY_ARCHIVED:
      return draft.filter((todo) => todo.archived === action.payload.archived);
    case ActionTypes.DELETE_COMPLETED:
      return draft.filter((todo) => !todo.completed);
    case ActionTypes.DELETE_ALL:
      return [];
    default:
      return draft;
  }
};
export default todoReducer;
