// This Sequelize Model represents User table in MySQL database.
// These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
// After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of these functions
// create(object), findByPk(id),findAll(),findOne({where:{email:...}}),findAll({where:{username:...}})
// these functions are used in controllers and middlewares

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }},{
    tableName: 'user'
  });

  return User;
};
