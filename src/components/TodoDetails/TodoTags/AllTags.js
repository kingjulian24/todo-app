import React, { useMemo } from "react";
import { Tag } from "./TodoTag"; // Ensure this is correctly imported
import { useTodoesContext } from "../../../hooks/TodoProvider";
import MenuItem from "../../TodoMenu/MenuItem";
import { IoMdPricetag } from "react-icons/io";

const AllTagsList = ({ isMenuOpen, selectedTagIds, setSelectedTagIds }) => {
  const [showTags, setShowTags] = React.useState(false);
  const todos = useTodoesContext();
  // Extract and deduplicate tags from todos
  const allTags = useMemo(() => {
    const tagSet = new Set(); // Using a Set to ensure uniqueness
    todos.forEach((todo) => {
      todo.tags.forEach((tag) => {
        if (!tagSet.has(tag.name)) {
          tagSet.add(tag.name);
        }
      });
    });
    return Array.from(tagSet)
      .map((tagName) => {
        // Find the tag object for each tagName
        for (const todo of todos) {
          const tag = todo.tags.find((tag) => tag.name === tagName);
          if (tag) return tag;
        }
        return null;
      })
      .filter((tag) => tag !== null); // Remove any null values
  }, [todos]);

  const handleClick = (id) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((tagId) => tagId !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  return (
    <div className={` ${isMenuOpen ? "block" : "hidden"} lg:block`}>
      <div className={`mt-2 ${isMenuOpen ? "block" : "hidden"}`}>
        <MenuItem
          title={showTags ? "Hide Tags" : "Show Tags"}
          onClick={() => setShowTags((p) => !p)}
        >
          <IoMdPricetag className="mr-2" />
        </MenuItem>
      </div>
      <div className={` ${showTags ? "block" : "hidden lg:block"}`}>
        <h3 className="my-2">Tags</h3>
        <div className="flex flex-wrap gap-2 ">
          {allTags.map((tag) => (
            <Tag
              key={tag.id}
              tag={tag}
              onClick={handleClick}
              isSelected={selectedTagIds.includes(tag.id)} // Optional: Highlight selected tags
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTagsList;
