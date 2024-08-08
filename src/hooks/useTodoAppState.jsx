import { useState, useEffect } from "react";
import { useTodoesContext } from "./TodoProvider";
import useTodoMenu from "./useTodoMenu";
import { PRIORITY_SORT, PRIORITY_SORT_MAP } from "./useTodoMenu";

const useTodoAppState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useTodoesContext();
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const { menuState, menuActions } = useTodoMenu();

  useEffect(() => {
    let updatedTodos = todos;

    if (menuState.filterArchived) {
      updatedTodos = updatedTodos.filter((todo) => todo.archived);
    } else {
      updatedTodos = updatedTodos.filter((todo) => !todo.archived);
    }

    if (selectedTagIds.length) {
      // Collect all tags from todos
      const allTags = [];
      updatedTodos.forEach((todo) => allTags.push(...todo.tags));

      // Find names of tags that match the selectedTagIds
      const selectedTagNames = new Set(
        allTags
          .filter((tag) => selectedTagIds.includes(tag.id))
          .map((tag) => tag.name)
      );
      if (selectedTagNames) {
        // Filter todos where any tag's name matches the selected tag names
        updatedTodos = updatedTodos.filter((todo) =>
          todo.tags.some((tag) => selectedTagNames.has(tag.name))
        );
      }
    }

    if (menuState.filterCompleted) {
      updatedTodos = updatedTodos.filter((todo) => !todo.completed);
    }

    if (menuState.sortPriority !== PRIORITY_SORT.NONE) {
      updatedTodos = [
        ...updatedTodos.sort((a, b) => {
          if (menuState.sortPriority === PRIORITY_SORT.ASC) {
            return (
              PRIORITY_SORT_MAP[a.priority] - PRIORITY_SORT_MAP[b.priority]
            );
          } else if (menuState.sortPriority === PRIORITY_SORT.DESC) {
            return (
              PRIORITY_SORT_MAP[b.priority] - PRIORITY_SORT_MAP[a.priority]
            );
          }
          return 0;
        }),
      ];
    }

    // Apply search filter
    if (searchQuery) {
      updatedTodos = updatedTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    setFilteredTodos(updatedTodos);
  }, [todos, searchQuery, selectedTagIds, menuState]);

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
    menuState,
    menuActions,
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
