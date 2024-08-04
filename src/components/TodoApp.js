import React, { useState } from "react";
import TodoDetails from "./TodoDetails";
import TodoList from "./TodoList";
import TodoMenu from "./TodoMenu";
import TodoProgress from "./TodoProgress";
import TodoSearch from "./TodoSearch";
import AddTodoButton from "./AddTodoButton";
import ToggleMenuButton from "./ToggleMenuButton";
import useTodoAppState from "../hooks/useTodoAppState";

const TodoApp = () => {
  const {
    isMenuOpen,
    isAddEditOpen,
    currentTodo,
    showHistory,
    searchQuery,
    filteredTodos,
    toggleMenu,
    toggleAddEdit,
    toggleAdding,
    handleEditTodo,
    handleSearch,
    setShowHistory,
  } = useTodoAppState();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <aside className="relative w-full lg:w-1/6 bg-white p-4 lg:p-6 lg:min-h-screen">
        <ToggleMenuButton toggleMenu={toggleMenu} />
        <TodoSearch searchQuery={searchQuery} handleSearch={handleSearch} />
        <TodoProgress />
        <TodoMenu
          isMenuOpen={isMenuOpen}
          setShowHistory={setShowHistory}
          showHistory={showHistory}
        />
      </aside>
      <main
        className={`flex-1 p-4 lg:p-6 relative ${isAddEditOpen ? "lg:w-1/2" : "lg:w-2/3"}`}
      >
        <h1 className="text-2xl font-bold mb-6">Todo List</h1>
        <TodoList filteredTodos={filteredTodos} onEdit={handleEditTodo} />
        <AddTodoButton toggleAdding={toggleAdding} />
      </main>

      {isAddEditOpen && (
        <TodoDetails
          onClose={toggleAddEdit}
          initialTodo={currentTodo}
          className={`bg-white p-4 lg:p-6 ${isAddEditOpen ? "fixed inset-0 z-30 lg:static lg:w-1/2" : "hidden"}`}
        />
      )}
    </div>
  );
};

export default TodoApp;
