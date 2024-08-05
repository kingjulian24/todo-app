import { STATUS } from "../../hooks/useTodoDetailsState";
const TodoCheckBox = ({ todo, handleChange, status }) => {
  return (
    <div className="flex items-center">
      {status !== STATUS.VIEW && (
        <>
          <input
            type="checkbox"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Completed</label>
        </>
      )}
    </div>
  );
};

export default TodoCheckBox;
