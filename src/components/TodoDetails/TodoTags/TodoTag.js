import { FaTrash } from "react-icons/fa";
import { STATUS } from "../../../hooks/useTodoDetailsState";
import { IoMdPricetag } from "react-icons/io";

const TodoTag = ({
  tag,
  handleTagRemove,
  status,
  setSelectedTagIds,
  selectedTagIds,
}) => {
  const handleClick = (id) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((tagId) => tagId !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };
  const isSelected = selectedTagIds && selectedTagIds.includes(tag.id);
  return (
    <>
      <Tag tag={tag} onClick={handleClick} isSelected={isSelected} />

      {status !== STATUS.VIEW && (
        <button
          type="button"
          onClick={() => handleTagRemove(tag.id)}
          className="ml-2 text-red-500"
        >
          <FaTrash size="12" />
        </button>
      )}
    </>
  );
};

export const Tag = ({ tag, onClick, isSelected }) => {
  return (
    <button
      className={`px-2 py-1 rounded flex items-center ${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => {
        onClick(tag.id);
      }}
    >
      <IoMdPricetag
        className={`mr-1 text-lg ${
          isSelected ? "text-yellow-300" : "text-orange-400"
        }`}
      />
      {tag.name}
    </button>
  );
};

export default TodoTag;
