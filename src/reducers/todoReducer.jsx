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

const todoReducer = (draft, action) => {
  switch (action.type) {
    case "ADD":
      draft.push({
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      });
      break;
    case "DELETE":
      return draft.filter((todo) => todo.id !== action.payload.id);
    case "UPDATE":
      const { title, completed } = action.payload;
      const todo = draft.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = title;
        todo.completed = completed;
      }
      break;
    case "TOGGLE":
      const todoToggle = draft.find((todo) => todo.id === action.payload.id);
      if (todoToggle) {
        todoToggle.completed = !todoToggle.completed;
      }
      break;
    case "DELETE_COMPLETED":
      return draft.filter((todo) => !todo.completed);
    case "DELETE_ALL":
      return [];
    default:
      return draft;
  }
};

export default todoReducer;
