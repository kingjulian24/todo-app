import { STATUS } from "../../hooks/useTodoDetailsState";
const Title = ({ status, title }) => {
  const getTitle = () => {
    switch (status) {
      case STATUS.VIEW:
        return title;
      case STATUS.EDIT:
        return "Edit Todo";
      case STATUS.ADD:
        return "Add Todo";
      default:
        return "";
    }
  };
  return <h2 className="text-xl font-semibold">{getTitle()}</h2>;
};

export default Title;
