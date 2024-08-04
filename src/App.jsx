import React from "react";
import TodoApp from "./components/TodoApp";
import TodoProvider from "./hooks/TodoProvider";
import todoReducer from "./reducers/todoReducer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [todos, dispatch] = useLocalStorage(todoReducer, [], "todo-db");

  return (
    <TodoProvider todos={todos} dispatch={dispatch}>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
