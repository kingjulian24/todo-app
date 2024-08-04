const TodoCheckBox = ({ todo, handleChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name="completed"
        checked={todo.completed}
        onChange={handleChange}
        className="mr-2"
      />
      <label>Completed</label>
    </div>
  );
};

export default TodoCheckBox;
