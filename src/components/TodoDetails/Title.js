const Title = ({ initialTodo }) => {
  return (
    <h2 className="text-xl font-semibold">
      {initialTodo ? "Edit" : "Add"} Todo
    </h2>
  );
};

export default Title;
