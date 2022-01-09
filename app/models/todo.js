// This Sequelize Model represents Todo table in MySQL database.
// These columns will be generated automatically: id, title, description, completed, createdAt, updatedAt.
// After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    }
  });

  return Todo;
};
