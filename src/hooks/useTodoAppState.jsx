import { useState, useEffect } from "react";
import { useTodoesContext } from "./TodoProvider";

const useTodoAppState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilteredByCompleted, setIsFilteredByCompleted] = useState(false);
  const todos = useTodoesContext();
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    let updatedTodos = todos;

    // Apply search filter
    if (searchQuery) {
      updatedTodos = updatedTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    // Apply completed filter
    if (isFilteredByCompleted) {
      updatedTodos = updatedTodos.filter((todo) => !todo.completed);
    }

    // Apply archived filter
    updatedTodos = updatedTodos.filter((todo) => todo.archived);

    if (showHistory) {
      updatedTodos = todos.filter((todo) => !todo.archived);
    }

    setFilteredTodos(updatedTodos);
  }, [todos, searchQuery, isFilteredByCompleted, showHistory]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleAddEdit = () => setIsAddEditOpen((prev) => !prev);
  const toggleAdding = () => {
    setCurrentTodo(null);
    toggleAddEdit();
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setIsAddEditOpen(true);
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return {
    isMenuOpen,
    isAddEditOpen,
    currentTodo,
    showHistory,
    searchQuery,
    filteredTodos,
    isFilteredByCompleted,
    toggleMenu,
    toggleAddEdit,
    toggleAdding,
    handleEditTodo,
    handleSearch,
    setShowHistory,
    setIsFilteredByCompleted,
  };
};

export default useTodoAppState;
