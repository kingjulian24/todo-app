import TodoDetails from "./TodoDetails";
import TodoList from "./TodoList";
import TodoMenu from "./TodoMenu";
import TodoProgress from "./TodoProgress";
import TodoSearch from "./TodoSearch";
import AddTodoButton from "./AddTodoButton";
import ToggleMenuButton from "./ToggleMenuButton";
import useTodoAppState from "../hooks/useTodoAppState";
import AllTagsList from "./TodoDetails/TodoTags/AllTags";
import CallToAction from "./CallToAction";

const TodoApp = () => {
  const {
    isMenuOpen,
    isAddEditOpen,
    currentTodo,
    searchQuery,
    filteredTodos,
    selectedTagIds,
    menuState,
    menuActions,
    toggleMenu,
    toggleAddEdit,
    toggleAdding,
    handleEditTodo,
    handleSearch,
    setSelectedTagIds,
    setFilteredTodos,
  } = useTodoAppState();

  const hasTodos = filteredTodos.length !== 0;
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <aside className="relative w-full lg:w-1/4 2xl:w-1/6 z-10 bg-white p-4 lg:p-6 lg:min-h-screen">
        <ToggleMenuButton toggleMenu={toggleMenu} />
        <TodoSearch searchQuery={searchQuery} handleSearch={handleSearch} />
        {hasTodos && <TodoProgress />}
        <TodoMenu
          isMenuOpen={isMenuOpen}
          setFilteredTodos={setFilteredTodos}
          state={menuState}
          actions={menuActions}
        />
        <AllTagsList
          isMenuOpen={isMenuOpen}
          selectedTagIds={selectedTagIds}
          setSelectedTagIds={setSelectedTagIds}
        />
      </aside>
      <main
        className={`flex-1 p-4 lg:p-6 relative ${isAddEditOpen ? "lg:w-1/2" : "lg:w-2/3"}`}
      >
        <h1 className="text-2xl font-bold mb-6 hidden">TODO LIST</h1>
        <TodoList filteredTodos={filteredTodos} onEdit={handleEditTodo} />
        {!hasTodos && <CallToAction />}

        <AddTodoButton toggleAdding={toggleAdding} shouldPulse={!hasTodos} />
      </main>

      {isAddEditOpen && (
        <TodoDetails
          onClose={toggleAddEdit}
          initialTodo={currentTodo}
          className={`bg-white p-4 lg:p-6 ${isAddEditOpen ? "fixed inset-0 z-30 lg:static lg:w-1/2" : "hidden"}`}
          setSelectedTagIds={setSelectedTagIds}
          selectedTagIds={selectedTagIds}
        />
      )}
    </div>
  );
};

export default TodoApp;
