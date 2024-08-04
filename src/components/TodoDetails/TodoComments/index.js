import { FaPlus } from "react-icons/fa";
import TodoComment from "./TodoComment";

const TodoComments = ({
  setNewComment,
  todo,
  handleCommentAdd,
  handleCommentRemove,
  newComment,
}) => {
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleCommentAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-2">
        {todo.comments.map((comment) => (
          <TodoComment
            key={comment.id}
            handleCommentRemove={handleCommentRemove}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoComments;
