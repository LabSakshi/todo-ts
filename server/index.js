const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors()); 

app.use(express.json()); //creating a middleware // modify incoming request data
const getTodo = (req, res) => {
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
};

const getSingleTodo = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const todo = todos.find((el) => el.id == req.params.id);

  if (id > todos.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

const createTodo = (req, res) => {
  const newId = todos[todos.length - 1].id + 1;
  console.log(newId, todos);
  const newTodo = Object.assign({ id: newId }, req.body);
  todos.push(newTodo);

  fs.writeFile(`${__dirname}/todo-list.json`, JSON.stringify(todos), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        todos: newTodo,
      },
    });
  });
};

const updateTodo = (req, res) => {
  const todoId = req.params.id * 1; // Convert the id to a number
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  // Check if the todo with the specified id exists
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Todo not found",
    });
  }

  // Update the todo with the new data from req.body
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
  };

  // Save the updated todos to the JSON file
  fs.writeFile(`${__dirname}/todo-list.json`, JSON.stringify(todos), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        todo: todos[todoIndex],
      },
    });
  });
};



const deleteTodo = (req, res) => {
  const todoId = req.params.id * 1; // Convert the id to a number
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  // Check if the todo with the specified id exists
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Todo not found",
    });
  }

  // Remove the todo with the specified id from the todos array
  const deletedTodo = todos.splice(todoIndex, 1)[0];

  // Save the updated todos to the JSON file
  fs.writeFile(`${__dirname}/todo-list.json`, JSON.stringify(todos), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        todo: deletedTodo,
      },
    });
  });
};
const todos = JSON.parse(fs.readFileSync(`${__dirname}/todo-list.json`));
app.get("/api/v1/todos", getTodo);

app.get("/api/v1/todos/:id", getSingleTodo);

app.post("/api/v1/todos", createTodo);

app.patch("/api/v1/todos/:id", updateTodo);

app.delete("/api/v1/todos/:id", deleteTodo);
const port = 3001;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
