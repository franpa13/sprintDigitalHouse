// const loggedMiddleware = (req, res, next) => {
//   res.locals.isAnUserLoged = false;
//   if (req.session.userLogged) {
//     res.locals.isAnUserLoged = true;
//     res.locals.dataUser = {
//       name: req.session.userLogged.NombreUsuario,
//       image: req.session.userLogged.image
//     };
//   }
 
//   next();
// };

// module.exports = loggedMiddleware;
