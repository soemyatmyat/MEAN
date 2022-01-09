
//import express and cors modules
// express is for building the Rest APIs
// cors provides Express middleware to enable CORS with various options
const express = require("express");
const cors = require("cors");

// create an Express App and then add body-parser (json and urlencoded)
// and cors middlewares using app.use() method.
const app = express();

var corsOptions = {
  origin: "http://localhost:8081" //origin is set to port 8081
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MEAN application." });
});

//
const db = require("./app/models");
//db.sequelize.sync();

//for testing environment
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

require("./app/routes/todo.routes")(app);
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
