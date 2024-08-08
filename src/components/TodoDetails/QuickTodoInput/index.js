import React, { useState } from "react";
import Error from "../../Error";

const QuickTodoInput = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [lockTag, setLockTag] = useState(false);

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      setError("");
      if (title.trim() && tag.trim()) {
        onAdd({ title, tag });
        setTitle("");
        if (!lockTag) {
          setLockTag(true);
        }
      } else {
        setError("Invalid to-do or tag");
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-x-2 mb-4 w-full">
      <form className="w-full flex flex-col gap-4">
        <h3>Quick To-do</h3>
        <input
          type="text"
          name="quick todo input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title and hit enter"
          className="border border-gray-300 px-2 py-1 rounded w-full"
          onKeyDown={handleAdd}
        />
        <input
          type="text"
          name="quick todo tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter group by tag"
          className="border border-gray-300 px-2 py-1 rounded w-full"
          disabled={lockTag}
          onKeyDown={handleAdd}
        />
      </form>
      <div className="mt-3">
        {lockTag && (
          <p className="text-green-500">Group tag lock with: [ {tag} ]</p>
        )}
        {error && <Error message={error} />}
      </div>
    </div>
  );
};

export default QuickTodoInput;
