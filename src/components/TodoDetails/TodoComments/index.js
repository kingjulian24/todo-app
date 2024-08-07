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
      <div className="space-y-2">
        {todo.comments.map((comment) => (
          <TodoComment
            key={comment.id}
            handleCommentRemove={handleCommentRemove}
            comment={comment}
          />
        ))}
      </div>

      <TodoCommentInput
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentAdd={handleCommentAdd}
      />
    </div>
  );
};

export default TodoComments;

function TodoCommentInput({ newComment, setNewComment, handleCommentAdd }) {
  return (
    <div className="flex space-x-2 mb-2 mt-2">
      <input
        type="text"
        name="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="flex-grow p-2 border rounded"
      />
      <button
        id="add-comment-btn"
        type="button"
        onClick={handleCommentAdd}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        <FaPlus />
      </button>
    </div>
  );
}
