const TodoDescription = ({ handleChange, todo }) => {
  return (
    <textarea
      name="desc"
      value={todo.desc}
      onChange={handleChange}
      placeholder="Description"
      className="w-full p-2 border rounded"
      rows="3"
    ></textarea>
  );
};

export default TodoDescription;
