// ESTE MIDDLEWARE ES PARA QUE SI EL USUARIO no se registro  , NO TE DEJE ACCEDER AL PROFILE
const authMiddleware = (req,res,next)=>{
    if (!req.session.userLog) {
        return res.redirect("/iniciar-sesion")
    }
    next()
    }
    module.exports = authMiddleware