const db = require("../models"); //import datatables;
const config = require("../config/auth.config"); //import secret key
const User=db.user; //import database users
const Role=db.role; //import database Roles

const Op = db.Sequelize.op;

var jwt=require("JsonWebToken");//import JWT library
var bcrypt=require("bCryptjs");//import bCryptJS

// controller for Registration, Login and Logout
// There are 3 main functionalites for Login and Registration
// signup: create new user in database (role = user by default)
// signin:
// (1) find username
// (2) if it exists, compare password with password in db using bcrypt
// (3) if it's correct, generate a token using JsonWebToken
// (4) return user information and access token
// signout: clear JsonWebToken


exports.signup= async(req,res) => {
  //save user to database
  try {
    const user= await User.create({
      username: req.body.username,
      email: req.body.email,
      password:bcrypt.hashSync(req.body.password,8)
    });
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result=user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!"});
    } else {
      //user has role=1
      const result=user.setRoles([1]);
      if (result) res.send({  message: "User registered successfully!"});
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; //signup

exports.signin=async(req,res)=>{
  try {
    const user=await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({message: "User not found."});
    }

    const passwordIsValid=bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password.",
      });
    }

    const token=jwt.sign({id:user.id},config.secret,{
      expiresIn:86400, //24 hours
    });

    let authorities=[];
    const roles=await user.getRoles(); //<-- how did user get roles from index.js in models?
    for (let i=0; i < roles.length; i++) {
      authorities.push("ROLE_"+roles[i].name.toUpperCase());
    }
    req.session.token=token;

    return res.status(200).send({
      id:user.id,
      username:user.username,
      email:user.email,
      roles:authorities,
    });

  } catch (error) {
    return res.status(500).send({message: error.message});
  }
};

exports.signout=async(req,res)=>{
  try{
    req.session=null;
    return res.status(200).send({
      message: "You've been signed out. See you next time!"
    });
  } catch (error) {
    this.next(error);
  }
};
