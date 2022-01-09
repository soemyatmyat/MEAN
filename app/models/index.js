const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize"); //import sequelize
// Instantiate sequelize with name of database, user and password
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require("./todo.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);

// One user can have serveral roles.
// One role can be baken on by many users.
// this creates a new table user_roles as connection between users and roles table viar their primary key as foreign keys
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.Roles=["user","admin","moderator"];

module.exports = db;
