import { FaPlus } from "react-icons/fa";
import TodoTag from "./TodoTag";

const TodoTags = ({
  todo,
  newTag,
  setNewTag,
  handleTagAdd,
  handleTagRemove,
}) => {
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleTagAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {todo.tags.map((tag) => (
          <TodoTag
            key={Date.now()}
            tag={tag}
            handleTagRemove={handleTagRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoTags;
