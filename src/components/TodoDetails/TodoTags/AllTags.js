import React, { useMemo } from "react";
import { Tag } from "./TodoTag"; // Ensure this is correctly imported

const AllTagsList = ({ filteredTodos, selectedTagIds, setSelectedTagIds }) => {
  // Extract and deduplicate tags from filteredTodos
  const allTags = useMemo(() => {
    const tagSet = new Set(); // Using a Set to ensure uniqueness
    filteredTodos.forEach((todo) => {
      todo.tags.forEach((tag) => {
        if (!tagSet.has(tag.id)) {
          tagSet.add(tag.id);
        }
      });
    });
    return Array.from(tagSet)
      .map((tagId) => {
        // Find the tag object for each tagId
        for (const todo of filteredTodos) {
          const tag = todo.tags.find((tag) => tag.id === tagId);
          if (tag) return tag;
        }
        return null;
      })
      .filter((tag) => tag !== null); // Remove any null values
  }, [filteredTodos]);

  const handleClick = (id) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((tagId) => tagId !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  return (
    <div className="hidden lg:block mt-4 space-y-2">
      <h3>Tags</h3>
      {allTags.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onClick={handleClick}
          isSelected={selectedTagIds.includes(tag.id)} // Optional: Highlight selected tags
        />
      ))}
    </div>
  );
};

export default AllTagsList;
