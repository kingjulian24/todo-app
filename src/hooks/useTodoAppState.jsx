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
    if (searchQuery) {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      setFilteredTodos(filteredTodos);
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, searchQuery]);

  useEffect(() => {
    if (isFilteredByCompleted) {
      const filteredTodos = todos.filter((todo) => !todo.completed);
      setFilteredTodos(filteredTodos);
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, isFilteredByCompleted]);

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
