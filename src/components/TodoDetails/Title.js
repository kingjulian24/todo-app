import { STATUS } from "../../hooks/useTodoDetailsState";
import { FaSpinner } from "react-icons/fa";

const Title = ({ status, title, isSaving }) => {
  const getTitle = () => {
    switch (status) {
      case STATUS.VIEW:
        return title;
      case STATUS.EDIT:
        return "Edit To-do";
      case STATUS.ADD:
        return "Add To-do";
      default:
        return "";
    }
  };
  return (
    <>
      <h2 className="text-xl font-semibold">{getTitle()}</h2>
      {status === STATUS.EDIT && isSaving && (
        <span className=" text-green-500 text-sm flex items-center">
          <FaSpinner className="animate-spin mr-1" /> Saving...
        </span>
      )}
    </>
  );
};

export default Title;
