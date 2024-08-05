import { useState, useEffect } from "react";
import { useTodoesContext } from "./TodoProvider";

export const PRIORITY_SORT = {
  ASC: "ASC",
  DESC: "DESC",
  NONE: "NONE",
};

const PRIORITY_SORT_MAP = {
  low: 0,
  medium: 1,
  high: 2,
};

const useTodoAppState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilteredByCompleted, setIsFilteredByCompleted] = useState(false);
  const todos = useTodoesContext();
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [sortPriority, setSortPriority] = useState(PRIORITY_SORT.NONE);

  useEffect(() => {
    let updatedTodos = todos;

    if (selectedTagIds.length) {
      updatedTodos = updatedTodos.filter((todo) => {
        return selectedTagIds.some((tagId) =>
          todo.tags.some((tag) => tag.id === tagId)
        );
      });
    }

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

    if (sortPriority !== PRIORITY_SORT.NONE) {
      updatedTodos.sort((a, b) => {
        if (sortPriority === PRIORITY_SORT.ASC) {
          return PRIORITY_SORT_MAP[a.priority] - PRIORITY_SORT_MAP[b.priority];
        } else if (sortPriority === PRIORITY_SORT.DESC) {
          return PRIORITY_SORT_MAP[b.priority] - PRIORITY_SORT_MAP[a.priority];
        }
        return 0;
      });
    }

    // Sort by completed status: true (completed) comes after false (not completed)
    updatedTodos.sort((a, b) => a.completed - b.completed);

    setFilteredTodos(updatedTodos);
  }, [
    todos,
    searchQuery,
    isFilteredByCompleted,
    showHistory,
    selectedTagIds,
    sortPriority,
  ]);

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
    setSelectedTagIds,
    selectedTagIds,
    sortPriority,
    setSortPriority,
  };
};

export default useTodoAppState;
