let db =require("../database/models")


const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');


const homeController = {
    /**** HOME ****/

    renderHome: (req, res) => {
        db.Products.findAll({
            attributes: ['id', 'title', 'editorial', 'price', 'stock', 'description', 'image', 'language', 'format', 'calification', 'autor']
          }).then((products) => {
            const clasificacion = products.filter((libros) => libros.calification > 3)
            res.render ("inicio" , {clasificaciones : clasificacion})
          }).catch((error) => {
             console.log(error);
          });
         
    },
    search: (req, res) => {
        const { keywords } = req.query;
        db.Products.findAll({
            attributes: ['id', 'title', 'editorial', 'price', 'stock', 'description', 'image', 'language', 'format', 'calification', 'autor'],
            include: [
                {
                    model: db.Genres, 
                    as: 'Genres', 
                    attributes: ['name']
                }
            ]
        })
        .then((libros) => {
            const libroBuscado = libros.filter((libro) => libro.title.toLowerCase().includes(keywords.toLowerCase()));
            res.render('resultado', { resultado: libroBuscado });
        })
        .catch((err) => {
            console.log(err);
        });
    },
    
    
    /**** INICIAR SESION ****/
    renderIniciarSesion: (req, res) => {
   
        res.render('IniciarSesion')
    },
     redireccionarI : async (req, res) => {
        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
          return res.render('iniciarSesion', {
            errors: errors.mapped(),
            old: req.body,
          });
        }
      
        try {
          const userLogin = await db.Clients.findOne({
            where: { email: req.body.Email },
          });
      
          if (userLogin) {
            const isApassword = await bcryptjs.compare(req.body.password, userLogin.password);
      
            if (isApassword) {
              delete userLogin.password;
              req.session.userLog = userLogin;
      
              if (req.body.recordar__usuario) {
                res.cookie('userEmail', req.body.Email, { maxAge: 1000 * 60 * 2 });
              }
      
              return res.redirect('/UserProfile');
            }
          }
      
          return res.render('iniciarSesion', {
            errors: {
              Email: {
                msg: 'Credenciales inválidas',
              },
            },
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }
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
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = homeController;