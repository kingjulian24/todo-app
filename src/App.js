import useLocalStorage from "./hooks/useLocalStorage";
import todoReducer from "./reducers/todoReducer";
import TodoProvider from "./hooks/TodoProvider";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoOptions from "./components/TodoOptions";

function App() {
  const [todos, dispatch] = useLocalStorage(todoReducer, [], "todo-items");
  return (
    <TodoProvider todos={todos} dispatch={dispatch}>
      <section className="bg-stone-200 min-h-screen items-center flex flex-col font-light">
        <div className="w-full sm:w-1/2 sm:mt-6">
          <h1 className="text-2xl mt-6 mb-3 text-center">Todo List</h1>
          <TodoInput />
          {todos.length > 0 && (
            <>
              <TodoOptions />
              <TodoList />
            </>
          )}
        </div>
      </section>
    </TodoProvider>
  );
}

export default App;
