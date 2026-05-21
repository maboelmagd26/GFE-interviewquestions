type TodoProps = {
  onTodoDelete: (id: string) => void;
  todo: string;
  id: string;
};

const Todo = ({ onTodoDelete, todo, id }: TodoProps) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        gap: "20px",
        marginBlock: "0 10px",
      }}
    >
      <span>{todo}</span>
      <button
        onClick={() => onTodoDelete(id)}
        style={{ textTransform: "uppercase", padding: "4px 8px" }}
      >
        Delete
      </button>
    </li>
  );
};
export default Todo;
