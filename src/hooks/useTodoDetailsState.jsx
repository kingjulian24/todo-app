import { useState, useEffect } from "react";
import { useTodoesDispatchContext } from "./TodoProvider";
import { ActionTypes } from "../reducers/todoReducer";
import { v4 as uuidv4 } from "uuid";

const resetTodo = (initialTodo) => {
  return {
    id: initialTodo?.id || uuidv4(),
    title: "",
    completed: false,
    startDate: Date.now(),
    endDate: "",
    priority: "low",
    tags: [],
    comments: [],
    desc: "",
    archived: false,
    options: {},
  };
};

const useTodoDetailsState = (onClose, initialTodo) => {
  const dispatch = useTodoesDispatchContext();
  const [todo, setTodo] = useState(resetTodo(initialTodo));

  const [newTag, setNewTag] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (initialTodo) {
      setTodo(initialTodo);
    }
  }, [initialTodo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagAdd = () => {
    if (newTag && !todo.tags.includes(newTag)) {
      setTodo((prevTodo) => ({
        ...prevTodo,
        tags: [...prevTodo.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      tags: prevTodo.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCommentAdd = () => {
    if (newComment) {
      const comment = {
        id: Date.now(),
        text: newComment,
        date: new Date().toISOString(),
      };
      setTodo((prevTodo) => ({
        ...prevTodo,
        comments: [...prevTodo.comments, comment],
      }));
      setNewComment("");
    }
  };

  const handleCommentRemove = (commentId) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      comments: prevTodo.comments.filter((comment) => comment.id !== commentId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialTodo) {
      dispatch({
        type: ActionTypes.UPDATE,
        payload: todo,
      });
      //onClose();
    } else {
      dispatch({
        type: ActionTypes.ADD,
        payload: todo,
      });
      setTodo(resetTodo(initialTodo));
    }
  };

  return {
    handleChange,
    handleCommentAdd,
    handleCommentRemove,
    handleTagAdd,
    handleTagRemove,
    handleSubmit,
    todo,
    newTag,
    setNewTag,
    newComment,
    setNewComment,
  };
};

export default useTodoDetailsState;
