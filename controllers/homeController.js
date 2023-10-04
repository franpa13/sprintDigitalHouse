const arrLibros = require('../baseDatos/libros')
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const homeController = {
    /**** HOME ****/
    renderHome: (req, res) => {
        // console.log("esto es req " , req.session.userLogged);
        const carrusel = arrLibros.filter((libros) => libros.carrusel === true);

        const clasificacion = arrLibros.filter((libros) => libros.clasificacion > 3)

        res.render('inicio', { agregarCarrusel: carrusel, clasificaciones: clasificacion })
    },
    search: (req, res) => {
        const { keywords } = req.query;

        const libroBuscado = arrLibros.filter((libro) => libro.titulo.toLowerCase().includes(keywords.toLowerCase()));

        res.render('resultado', { resultado: libroBuscado });
    },
    /**** INICIAR SESION ****/
    renderIniciarSesion: (req, res) => {
        console.log(req.session);
        res.render('IniciarSesion')
    },
    redireccionarI: (req, res) => {
        // const formData = req.body; 
        // res.redirect("/")
        let userLogin = User.findByField("Email", req.body.Email)
        if (userLogin) {
            let isApassword = bcryptjs.compareSync(req.body.password, userLogin.password)
            if (isApassword) {
                delete userLogin.password
                req.session.userLog = userLogin
                return res.redirect("/UserProfile")
            }
            return res.render("iniciarSesion", {
                errors: {
                    Email: {
                        msg: "las credenciales son invalidas"
                    }
                }
            })
        }
        return res.render("iniciarSesion", {
            errors: {
                Email: {
                    msg: "no se encuentra este usuario en la base de datos"
                }
            }
        })
    },
    /**** REGISTRARSE ****/
    renderRegistrarse: (req, res) => {
        res.render('Registrarse')
    },
    createUser: (req, res) => {
        res.redirect("/iniciar-sesion")
    },

    // VISTA PERFIL
    renderUserProfile : (req,res) =>{
     res.render("UserProfile",{
        user:req.session.userLog
     })
    },
    //LOG OUT
    logout:(req,res)=>{
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = homeController;