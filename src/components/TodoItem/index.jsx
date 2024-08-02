import React from "react";
import useTodoItemState from "../../hooks/useTodoItemState";
import Error from "../Error";
import TodoInputForm from "../TodoInput/TodoInputForm";
import { TbTrash } from "react-icons/tb";

export default function TodoItem({ todo }) {
  const {
    title,
    isEditing,
    completed,
    handleSubmit,
    handleEdit,
    toggleCompleted,
    setIsEditing,
    handleDeleteAll,
    error,
  } = useTodoItemState(todo);

  return (
    <section className="flex  rounded-lg my-2 shadow-md py-4 animate-fade-in">
      <section className="w-9/12">
        {isEditing ? (
          <TodoInputForm
            title={title}
            handleChange={handleEdit}
            handleSubmit={handleSubmit}
          />
        ) : (
          <>
            <CompletedCheckBox
              completed={completed}
              toggleCompleted={toggleCompleted}
            />
            <TodoContent
              completed={completed}
              setIsEditing={setIsEditing}
              title={title}
            />
          </>
        )}
      </section>
      <section className="w-3/12 text-right">
        <button onClick={handleDeleteAll} className="text-red-600 text-xl pr-4">
          <TbTrash />
        </button>
      </section>
      {error && <Error message={error} />}
    </section>
  );
}

function TodoContent({ completed, setIsEditing, title }) {
  return (
    <span onClick={() => setIsEditing(true)} className="text-xl align-middle">
      {completed ? <del>{title}</del> : title}
    </span>
  );
}

function CompletedCheckBox({ completed, toggleCompleted }) {
  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={toggleCompleted}
      className="mr-2 ml-2 h-5 w-5 align-middle"
    />
  );
}
