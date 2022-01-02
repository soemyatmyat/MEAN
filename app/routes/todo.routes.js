module.exports = app => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Todo
  router.post("/", todos.create);

  // Retrieve all Todos
  router.get("/", todos.findAll);

  // Retrieve all published Todos
  router.get("/completed", todos.findAllCompleted);

  // Retrieve a single Todo with id
  router.get("/:id", todos.findOne);

  // Update a Todo with id
  router.put("/:id", todos.update);

  // Delete a Todo with id
  router.delete("/:id", todos.delete);

  // Delete all Todos
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};