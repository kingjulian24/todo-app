import TodoDescription from "./TodoDescription";
import Title from "./Title";
import TodoInput from "./TodoInput";
import TodoPriority from "./TodoPriority";
import { AiOutlineClose } from "react-icons/ai";
import useTodoDetailsState from "../../hooks/useTodoDetailsState";
import TodoTags from "./TodoTags";
import TodoComments from "./TodoComments";
import TodoCheckBox from "./TodoCheckBox";

const TodoDetails = ({ onClose, className, initialTodo = null }) => {
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
  } = useTodoDetailsState(onClose, initialTodo);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <Title initialTodo={initialTodo} />
        <button onClick={onClose} className="text-gray-500">
          <AiOutlineClose className="text-xl" />
        </button>
      </div>
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
        />
        <TodoComments
          todo={todo}
          handleCommentAdd={handleCommentAdd}
          handleCommentRemove={handleCommentRemove}
          setNewComment={setNewComment}
          newComment={newComment}
        />
        <TodoCheckBox todo={todo} handleChange={handleChange} />
        <button
          type="submit"
          className="w-full  bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default TodoDetails;
