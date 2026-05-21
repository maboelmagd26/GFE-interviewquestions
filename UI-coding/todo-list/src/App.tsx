import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<{ id: string; todoText: string }[] | null>(
    null,
  );
  const hasError = task.trim().length < 4 && task.length > 0;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTask = task.trim();
    if (trimmedTask.length < 4) return;
    setTodos((prev) => {
      prev ||= [];
      return [...prev, { id: crypto.randomUUID(), todoText: trimmedTask }];
    });
    setTask("");
  };
  const handleDelete = (id: string) => {
    setTodos((prevTodos) => (prevTodos || []).filter((todo) => todo.id !== id));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      style={{
        backgroundColor: "grey",
        maxWidth: "1200px",
        marginInline: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          id="task"
          placeholder="add your task"
          value={task}
          onChange={handleChange}
          // Aria
          aria-label="add a new todo"
          aria-invalid={hasError}
          aria-describedby={hasError ? "task-error" : undefined}
          aria-required
        />
        <button type="submit">Submit</button>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {todos?.length
            ? `${todos.length} task${todos.length > 1 ? "s" : ""} added`
            : "No tasks yet"}
        </div>
      </div>
      {/* validation error for users and screen readers */}
      <ul>
        {todos && todos.length > 0
          ? todos.map(({ id, todoText }) => (
              <Todo
                key={id}
                id={id}
                todo={todoText}
                onTodoDelete={() => handleDelete(id)}
              />
            ))
          : "No Tasks Added yet"}
      </ul>
      {hasError && (
        <p id="task-error" role="alert">
          Task should be at least 4
        </p>
      )}
    </form>
  );
}

export default App;
