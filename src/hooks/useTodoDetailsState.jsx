import { useState, useEffect } from "react";
import { useTodoesDispatchContext } from "./TodoProvider";
import { ActionTypes } from "../reducers/todoReducer";
import { v4 as uuidv4 } from "uuid";
import useAutoSave from "./useAutoSave";

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

export const STATUS = {
  ADD: "ADD",
  EDIT: "EDIT",
  VIEW: "VIEW",
};

const useTodoDetailsState = (onClose, initialTodo) => {
  const dispatch = useTodoesDispatchContext();
  const [todo, setTodo] = useState(resetTodo(initialTodo));

  const [newTag, setNewTag] = useState("");
  const [newComment, setNewComment] = useState("");
  const isEditing = Boolean(initialTodo);
  const [status, setStatus] = useState(isEditing ? STATUS.VIEW : STATUS.ADD);
  const [isSaving, setIsSaving] = useAutoSave(1000);
  const [showQuickTodo, setShowQuickTodo] = useState(true);

  useEffect(() => {
    if (initialTodo) {
      setTodo(initialTodo);
      setStatus(STATUS.VIEW);
    }
  }, [initialTodo]);

  useEffect(() => {
    if (todo && isEditing) {
      dispatch({
        type: ActionTypes.UPDATE,
        payload: todo,
      });
      setIsSaving(true);
    }
  }, [todo, dispatch, isEditing, setIsSaving]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagAdd = () => {
    if (newTag && !todo.tags.some((tag) => tag.name === newTag)) {
      const newTagObject = { id: uuidv4(), name: newTag }; // Create a new tag object with an ID
      setTodo((prevTodo) => ({
        ...prevTodo,
        tags: [...prevTodo.tags, newTagObject],
      }));
      setNewTag(""); // Clear the input field
    }
  };

  const handleTagRemove = (tagId) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      tags: prevTodo.tags.filter((tag) => tag.id !== tagId),
    }));
  };

  const handleTodoDelete = () => {
    dispatch({
      type: ActionTypes.DELETE,
      payload: todo.id,
    });
    onClose();
  };

  function handleCommentAdd() {
    if (newComment) {
      const comment = {
        id: uuidv4(),
        text: newComment,
        date: new Date().toISOString(),
      };
      setTodo((prevTodo) => ({
        ...prevTodo,
        comments: [...prevTodo.comments, comment],
      }));
      setNewComment("");
    }
  }

  const handleCommentRemove = (commentId) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      comments: prevTodo.comments.filter((comment) => comment.id !== commentId),
    }));
  };

  const handleEditStatus = () => {
    setStatus(STATUS.EDIT);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      dispatch({
        type: ActionTypes.ADD,
        payload: todo,
      });
      setTodo(resetTodo(initialTodo));
    }
  };

  const handleQuickTodo = ({ title, tag }) => {
    const newTagObject = { id: uuidv4(), name: tag };
    const newTodo = { ...todo, id: uuidv4(), title, tags: [newTagObject] };
    dispatch({
      type: ActionTypes.ADD,
      payload: newTodo,
    });
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
    status,
    handleEditStatus,
    handleTodoDelete,
    isSaving,
    showQuickTodo,
    setShowQuickTodo,
    handleQuickTodo,
  };
};

export default useTodoDetailsState;
