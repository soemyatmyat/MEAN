const jwt = require("jsonwebtoken"); //import jwt library
const config = require("../config/auth.config.js"); //import key
const db = require("../models"); //import data tables
const User = db.user; //get user table

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // check if request header has token
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  //undecode the token an compare the hash value of the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

//include the function into middlware: authJwt
const authJwt={
  verifyToken: verifyToken
};
//export it
module.exports=authJwt;
