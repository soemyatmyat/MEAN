// This Sequelize Model represents tutorials table in MySQL database. 
// These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
// After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
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