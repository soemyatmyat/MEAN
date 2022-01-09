//in middleware functions - we need 2 functions to verify a registration
const db = require("../models");
const Role = db.Role; //calling role class
const User = db.user; //calling user class

// -- check if username or email already exists in system
//async function is needed to declare for await
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      res.status(400).send({
        message: "Error, username already exists."
      });
    }

      // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(400).send({
        message: "Error, Email already exists."
      });
    }
    next();

  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate username."
    });
  }
};

// -- check if roles in the request exist or not
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Role.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Error, Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

// include the function into middleware verifySignup.js
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

// export it
module.exports = verifySignUp;
