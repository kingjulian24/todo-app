import React from "react";
import { useTodoesDispatchContext } from "./TodoProvider";

const useTodoInputState = () => {
  const dispatch = useTodoesDispatchContext();
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const isBlank = () => {
    if (title.trim() === "") {
      setError("Please enter a valid todo title.");
      return true;
    }
    setError("");
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBlank()) return;
    dispatch({ type: "ADD", payload: { title } });
    setTitle("");
  };
  return { error, title, handleChange, handleSubmit };
};

export default useTodoInputState;
