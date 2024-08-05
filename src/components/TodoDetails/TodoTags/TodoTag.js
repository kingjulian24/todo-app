import { FaTrash } from "react-icons/fa";
import { STATUS } from "../../../hooks/useTodoDetailsState";
import { v4 as uuidv4 } from "uuid";
import { IoMdPricetag } from "react-icons/io";

const TodoTag = ({ tag, handleTagRemove, status }) => {
  return (
    <span
      key={uuidv4()}
      className="bg-gray-200 px-2 py-1 rounded flex items-center"
    >
      <IoMdPricetag className="mr-1 text-orange-400 text-lg" />
      {tag}
      {status !== STATUS.VIEW && (
        <button
          type="button"
          onClick={() => handleTagRemove(tag)}
          className="ml-2 text-red-500"
        >
          <FaTrash size="12" />
        </button>
      )}
    </span>
  );
};

export default TodoTag;
