const TodoPriority = ({ handleChange, todo }) => {
  return (
    <select
      name="priority"
      value={todo.priority}
      onChange={handleChange}
      className="w-full p-2 border rounded"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export default TodoPriority;
