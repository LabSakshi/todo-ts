import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import exp from "constants";
import SingleTodo from "./component/SingleTodo";

const setup = () => {
  const todoApp = render(<App />);
  const inputBox = screen.getByPlaceholderText(
    "Enter a Todo"
  ) as HTMLInputElement;
  const goButton = screen.getByRole("button");
  const form = screen.getByTestId("todo-form");
  return { inputBox, todoApp, goButton, form };
};

const addTask = () => {
  const { inputBox, form } = setup();
  fireEvent.change(inputBox, { target: { value: "read" } });
  fireEvent.submit(form);
};

test("it should take user input", async () => {
  const { inputBox } = setup();
  fireEvent.change(inputBox, { target: { value: "read" } });
  expect(inputBox.value).toBe("read");
});

test("it should add task to list on clicking on Go button", () => {
  addTask()
  const singleTodo = screen.getByTestId("single-todo");
  expect(singleTodo).toBeInTheDocument;
});

test("it should edit task on clicking edit icon", () => {
  addTask()
  const editIcon = screen.getByTestId("edit-icon")
  expect(screen.queryByTestId('edit-input-box')).not.toBeInTheDocument
  fireEvent.click(editIcon)
  expect(screen.getByTestId('edit-input-box')).toBeInTheDocument
});

test("it should delete task on clicking delete icon", () => {
  addTask()
  const singleTodo = screen.getByTestId("single-todo");
  const deleteIcon = screen.getByTestId("delete-icon")
  expect(singleTodo).toBeInTheDocument
  fireEvent.click(deleteIcon)
  expect(singleTodo).not.toBeInTheDocument
});

test("it should strike task on clicking done icon", () => {
  addTask()
  const doneIcon = screen.getByTestId("done-icon");
  const strikedItem = screen.queryByTestId("striked-item")
  expect(strikedItem).not.toBeInTheDocument
  fireEvent.click(doneIcon)
  expect(strikedItem).toBeInTheDocument
});
