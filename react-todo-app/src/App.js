import React, { useState } from "react";
import "./App.css";

const AddTodo = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="header-label">
        <p>Add a todo</p>
      </label>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
};

const DisplayTodos = ({ todos, setTodos }) => {
  if (todos.length === 0) {
    return "";
  }

  const removeTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
    return;
  };
  const listItems = todos.map((todo, index) => (
    <li className="todo-item" key={index}>
      {todo} <button onClick={() => removeTodo(index)}>✖</button>
    </li>
  ));
  return <ul>{listItems}</ul>;
};

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <AddTodo
        setTodos={setTodos}
        todos={todos}
        className="App-header"
      ></AddTodo>
      <DisplayTodos todos={todos} setTodos={setTodos}></DisplayTodos>
    </div>
  );
}

export default App;
