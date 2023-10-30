import React, { useState } from 'react';
import './App.css';
import InputFeild from './component/InputFeild';
import { Todo } from './component/model';
import TodoList from './component/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
    } 
    setTodo("")
  }
  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos}/>
      {/* {todos.map((t)=>{
          return (
            <li>{t.todo}</li>
          )
      })} */}
    </div>
  );
}

export default App;
