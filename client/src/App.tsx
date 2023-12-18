import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./component/InputField";
import { Todo } from "./component/model";
import TodoList from "./component/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3001/api/v1/todos");
      const data = await response.json();
      console.log(data.data.todos, "📲📲");
      setTodos(data.data.todos);
    };
    fetchTodos();
  }, []);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), task:todo, isDone: false }]);
    }
    setTodo("");
  };
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
