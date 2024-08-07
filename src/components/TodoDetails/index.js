import TodoDescription from "./TodoDescription";
import Title from "./Title";
import TodoInput from "./TodoInput";
import TodoPriority from "./TodoPriority";
import { AiOutlineClose } from "react-icons/ai";
import useTodoDetailsState from "../../hooks/useTodoDetailsState";
import TodoTags from "./TodoTags";
import TodoComments from "./TodoComments";
import TodoCheckBox from "./TodoCheckBox";
import { STATUS } from "../../hooks/useTodoDetailsState";

const TodoDetails = ({
  onClose,
  className,
  setSelectedTagIds,
  selectedTagIds,
  initialTodo = null,
}) => {
  const {
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
  } = useTodoDetailsState(onClose, initialTodo);

  return (
    <div id="todo-details" className={className}>
      <div className="flex justify-between items-center mb-4">
        <Title status={status} title={todo.title} isSaving={isSaving} />
        <button
          id="close-add-todo-btn"
          onClick={onClose}
          className="text-gray-500"
        >
          <AiOutlineClose className="text-xl" />
        </button>
      </div>
      {status === STATUS.VIEW ? (
        <div className="space-y-4">
          <TodoDescription todo={todo} status={status} />
          <TodoTags
            todo={todo}
            status={status}
            setSelectedTagIds={setSelectedTagIds}
            selectedTagIds={selectedTagIds}
          />
          <TodoComments
            todo={todo}
            handleCommentAdd={handleCommentAdd}
            handleCommentRemove={handleCommentRemove}
            setNewComment={setNewComment}
            status={status}
          />
          <TodoCheckBox
            todo={todo}
            handleChange={handleChange}
            status={status}
          />
          <button
            className="w-full  bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEditStatus}
          >
            Edit
          </button>
        </div>
      ) : (
        <TodoUpdateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          todo={todo}
          setNewTag={setNewTag}
          handleTagRemove={handleTagRemove}
          handleTagAdd={handleTagAdd}
          newTag={newTag}
          handleCommentAdd={handleCommentAdd}
          handleCommentRemove={handleCommentRemove}
          setNewComment={setNewComment}
          newComment={newComment}
          handleTodoDelete={handleTodoDelete}
          status={status}
          setSelectedTagIds={setSelectedTagIds}
          selectedTagIds={selectedTagIds}
        />
      )}
    </div>
  );
};

function TodoUpdateForm({
  handleSubmit,
  handleChange,
  todo,
  setNewTag,
  handleTagRemove,
  handleTagAdd,
  newTag,
  handleCommentAdd,
  handleCommentRemove,
  setNewComment,
  newComment,
  handleTodoDelete,
  status,
  setSelectedTagIds,
  selectedTagIds,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TodoInput handleChange={handleChange} todo={todo} />
      <TodoDescription handleChange={handleChange} todo={todo} />
      <TodoPriority handleChange={handleChange} todo={todo} />
      <TodoTags
        todo={todo}
        setNewTag={setNewTag}
        handleTagRemove={handleTagRemove}
        handleTagAdd={handleTagAdd}
        newTag={newTag}
        setSelectedTagIds={setSelectedTagIds}
        selectedTagIds={selectedTagIds}
      />
      <TodoComments
        todo={todo}
        handleCommentAdd={handleCommentAdd}
        handleCommentRemove={handleCommentRemove}
        setNewComment={setNewComment}
        newComment={newComment}
      />
      <TodoCheckBox todo={todo} handleChange={handleChange} />
      {status === STATUS.EDIT ? (
        <button
          onClick={() => {
            handleTodoDelete(todo.id);
          }}
          className="w-full  bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      ) : (
        <button
          type="submit"
          id="save-todo-btn"
          className="w-full  bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      )}
    </form>
  );
}

export default TodoDetails;
