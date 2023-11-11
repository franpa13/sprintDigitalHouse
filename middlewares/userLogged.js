const User = require("../models/User")
const userLogged = (req, res, next) => {
    

    res.locals.isLogged = false;

    let emailCookie = req.cookies.userEmail
    let userDeCookie = User.findByField("Email",emailCookie)
    console.log(userDeCookie);
    if (userDeCookie) {
      req.session.userLog = userDeCookie
    }

    if (req.session && req.session.userLog) {
      res.locals.isLogged = true;
      res.locals.userLog = req.session.userLog
    }

  
    next();
  };
  
  module.exports = userLogged;