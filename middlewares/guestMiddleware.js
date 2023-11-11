// ESTE MIDDLEWARE ES PARA QUE SI EL USUARIO ESTA EN SESSION , NO TE DEJE ACCEDER A REGISTER NI A LOGIN
const guestMiddleware = (req,res,next)=>{
if (req.session.userLog) {
    return res.redirect("/UserProfile")
}
next()
}
module.exports = guestMiddleware