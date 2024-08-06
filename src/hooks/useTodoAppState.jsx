import { useState, useEffect } from "react";
import { useTodoesContext } from "./TodoProvider";

const useTodoAppState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useTodoesContext();
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  useEffect(() => {
    let updatedTodos = todos;

    if (selectedTagIds.length) {
      updatedTodos = updatedTodos.filter((todo) => {
        return selectedTagIds.some((tagId) =>
          todo.tags.some((tag) => tag.id === tagId)
        );
      });
    }

    // Apply search filter
    if (searchQuery) {
      updatedTodos = updatedTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    if (searchQuery || selectedTagIds.length) {
      setFilteredTodos(updatedTodos);
    }
  }, [todos, searchQuery, selectedTagIds]);

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
    searchQuery,
    filteredTodos,
    selectedTagIds,
    toggleMenu,
    toggleAddEdit,
    toggleAdding,
    handleEditTodo,
    handleSearch,
    setSelectedTagIds,
    setFilteredTodos,
  };
};

export default useTodoAppState;
