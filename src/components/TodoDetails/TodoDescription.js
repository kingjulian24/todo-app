import { STATUS } from "../../hooks/useTodoDetailsState";

const TodoDescription = ({ handleChange, todo, status }) => {
  return (
    <>
      {status === STATUS.VIEW ? (
        <p>{todo.desc}</p>
      ) : (
        <textarea
          name="desc"
          value={todo.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>
      )}
    </>
  );
};

export default TodoDescription;
