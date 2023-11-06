import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";

const SingleTodo: React.FC<{
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    console.log('heelloooooo!!!!!!!!!1')
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => handleEdit(e, todo.id)}
      data-testid="single-todo"
    >
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          id="todo__edit--text"
          ref={inputRef}
          data-testid="edit-input-box"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text" id="striked-todo" data-testid="striked-item">
          {todo.todo}
        </s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      {!edit && (
        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
                }
            }}
            data-testid="edit-icon"
          >
            <AiFillEdit />
          </span>
          <span
            className="icon"
            onClick={() => handleDelete(todo.id)}
            data-testid="delete-icon"
          >
            <AiFillDelete />
          </span>
          <span
            className="icon"
            onClick={() => handleDone(todo.id)}
            data-testid="done-icon"
          >
            <MdDone />
          </span>
        </div>
      )}
    </form>
  );
};

export default SingleTodo;
