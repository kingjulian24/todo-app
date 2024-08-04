import { FaTrash } from "react-icons/fa";

const TodoTag = ({ tag, handleTagRemove }) => {
  return (
    <span key={tag} className="bg-gray-200 px-2 py-1 rounded flex items-center">
      {tag}
      <button
        type="button"
        onClick={() => handleTagRemove(tag)}
        className="ml-2 text-red-500"
      >
        <FaTrash size="12" />
      </button>
    </span>
  );
};

export default TodoTag;
