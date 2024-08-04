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

    // Apply archived filter
    if (showHistory) {
      updatedTodos = updatedTodos.filter((todo) => todo.archived);
    } else {
      updatedTodos = updatedTodos.filter((todo) => !todo.archived);
    }

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

    // Sort by completed status: true (completed) comes after false (not completed)
    updatedTodos.sort((a, b) => a.completed - b.completed);

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
