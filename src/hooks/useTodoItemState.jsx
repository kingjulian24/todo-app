import React from "react";
import { useTodoesDispatchContext } from "./TodoProvider";

const useTodoItemState = (todo) => {
  const dispatch = useTodoesDispatchContext();
  const [title, setTitle] = React.useState(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);
  const [completed, setCompleted] = React.useState(todo.completed);
  const [error, setError] = React.useState(false);

  const toggleCompleted = () => {
    setCompleted((p) => !p);
    dispatch({ type: "TOGGLE", payload: { id: todo.id, completed } });
  };

  const handleEdit = (e) => {
    setTitle(e.target.value);
  };

  const isBlank = () => {
    if (title.trim() === "") {
      setError("Please enter a valid todo title.");
      return true;
    }
    setError(false);
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBlank()) return;

    dispatch({ type: "UPDATE", payload: { id: todo.id, title, completed } });
    setIsEditing(false);
  };

  const handleDeleteAll = () =>
    dispatch({ type: "DELETE", payload: { id: todo.id } });
  return {
    title,
    isEditing,
    completed,
    handleSubmit,
    handleEdit,
    toggleCompleted,
    setIsEditing,
    error,
    handleDeleteAll,
  };
};

export default useTodoItemState;
