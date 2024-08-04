import { FaTrash } from "react-icons/fa";
const TodoComment = ({ handleCommentRemove, comment }) => {
  return (
    <div
      key={comment.id}
      className="bg-gray-100 p-2 rounded flex justify-between items-center"
    >
      <span>{comment.text}</span>
      <button
        type="button"
        onClick={() => handleCommentRemove(comment.id)}
        className="text-red-500"
      >
        <FaTrash size="12" />
      </button>
    </div>
  );
};

export default TodoComment;
