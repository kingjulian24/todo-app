import React, { useMemo } from "react";
import { Tag } from "./TodoTag"; // Ensure this is correctly imported

const TagList = ({ selectedTagIds, setSelectedTagIds, filteredTodos }) => {
  // Extract and deduplicate tags from filteredTodos
  const tags = useMemo(() => {
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

  // Filter tags to only include selected tags
  const selectedTags = useMemo(() => {
    return tags.filter((tag) => selectedTagIds.includes(tag.id));
  }, [tags, selectedTagIds]);

  return (
    <div>
      {selectedTags.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onClick={() => {
            setSelectedTagIds((prevIds) =>
              prevIds.filter((id) => id !== tag.id)
            );
          }}
        />
      ))}
    </div>
  );
};

export default TagList;
