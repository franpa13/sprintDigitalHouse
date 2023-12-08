

const db = require("../database/models")   // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const userLogged = async (req, res, next) => {
      res.locals.isLogged = false;
      
  let emailCookie = req.cookies.userEmail ;
  if (!emailCookie) {
    console.log('La cookie "userEmail" no está presente o es undefined.');
    return next();
}
console.log("esto es email cookie" , emailCookie);
  try {
      // Utilizando Sequelize para buscar un usuario por correo electrónico
      let userDeCookie = await db.Clients.findOne({
          where: { 
            email: emailCookie
          }
      });
      if (userDeCookie) {
        req.session.userLog = userDeCookie
      }
  
       if (req.session.userLog) {
      res.locals.isLogged = true;
      res.locals.userLog = req.session.userLog
    }
  console.log( "esto es user de cookie", userDeCookie);
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