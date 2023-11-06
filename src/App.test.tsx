import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

const setup = () => {
  const {container} = render(<App />);
  const inputBox = screen.getByPlaceholderText(
    "Enter a Todo"
  ) as HTMLInputElement;
  const goButton = screen.getByRole("button");
  const form = screen.getByTestId("todo-form");
  return { inputBox, container, goButton, form };
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
  const spanElement = screen.getByText('read', { selector: '.todos__single--text' });
  expect(spanElement).toBeInTheDocument()
});

test("it should edit task on clicking edit icon", () => {
  addTask()
  const editIcon = screen.getByTestId("edit-icon")
  fireEvent.click(editIcon)
  const editInputBox = screen.getByTestId('edit-input-box');
  expect(editInputBox).toHaveValue('read')
  userEvent.type(editInputBox, ' & write');
  expect(editInputBox).toHaveValue('read & write');
});

test("it should delete task on clicking delete icon", () => {
  addTask()
  const singleTodo = screen.getByText('read', {selector:'.todos__single--text'});
  const deleteIcon = screen.getByTestId("delete-icon")
  expect(singleTodo).toBeInTheDocument()
  fireEvent.click(deleteIcon)
  expect(singleTodo).not.toBeInTheDocument()
});

test("it should strike task on clicking done icon", () => {
  addTask()
  const doneIcon = screen.getByTestId("done-icon");
  fireEvent.click(doneIcon)
  const strikedItem = screen.getByText('read', { selector: '#striked-todo' });
  expect(strikedItem).toBeInTheDocument()
});
