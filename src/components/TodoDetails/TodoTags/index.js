import { FaPlus } from "react-icons/fa";
import TodoTag from "./TodoTag";
import { v4 as uuidv4 } from "uuid";
import { STATUS } from "../../../hooks/useTodoDetailsState";

const TodoTags = ({
  todo,
  newTag,
  setNewTag,
  handleTagAdd,
  handleTagRemove,
  status,
}) => {
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        {status !== STATUS.VIEW && (
          <TagInput
            newTag={newTag}
            setNewTag={setNewTag}
            handleTagAdd={handleTagAdd}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {todo.tags.map((tag) => (
          <TodoTag key={uuidv4()} tag={tag} handleTagRemove={handleTagRemove} />
        ))}
      </div>
    </div>
  );
};

export default TodoTags;

function TagInput({ newTag, setNewTag, handleTagAdd }) {
  return (
    <>
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
    </>
  );
}
