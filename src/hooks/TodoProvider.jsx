import React from "react";

const TodosContext = React.createContext([]);
const TodosDispatchContext = React.createContext();

const TodoProvider = ({ todos, children, dispatch }) => {
  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodoesContext = () => React.useContext(TodosContext);
export const useTodoesDispatchContext = () =>
  React.useContext(TodosDispatchContext);

export default TodoProvider;
