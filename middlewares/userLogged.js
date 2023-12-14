const db = require("../database/models");

const userLogged = async (req, res, next) => {
  res.locals.isLogged = false;

  let emailCookie = req.cookies.userEmail;

  if (!emailCookie && req.session.userLog) {
    // Si no hay cookie pero hay información en la sesión, continúa
    res.locals.isLogged = true;
    res.locals.userLog = req.session.userLog;
    return next();
  }

  if (!emailCookie) {
    console.log('La cookie "userEmail" no está presente o es undefined.');
    return next();
  }

  try {
    let userDeCookie = await db.Clients.findOne({
      where: { 
        email: emailCookie
      }
    });

    if (userDeCookie) {
      req.session.userLog = userDeCookie;

      if (req.session && req.session.userLog) {
        res.locals.isLogged = true;
        res.locals.userLog = req.session.userLog;
      }
    }

    next();
  } catch (error) {
    console.error('Error al buscar usuario en la base de datos:', error);
    next(error);
  }
};

module.exports = userLogged;





// const User = require("../models/User")
// const db = require("")

// const userLogged = (req, res, next) => {
    

//     res.locals.isLogged = false;

//     let emailCookie = req.cookies.userEmail
//     let userDeCookie = User.findByField("Email",emailCookie)
//     console.log(userDeCookie);
//     if (userDeCookie) {
//       req.session.userLog = userDeCookie
//     }

//     if (req.session && req.session.userLog) {
//       res.locals.isLogged = true;
//       res.locals.userLog = req.session.userLog
//     }

  
//     next();
//   };
  
//   module.exports = userLogged;