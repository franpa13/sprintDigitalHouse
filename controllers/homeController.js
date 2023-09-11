const arrLibros = require('../baseDatos/libros')

const homeController = {
    /**** HOME ****/
    renderHome : (req, res) => {
        const carrusel = arrLibros.filter((libros) => libros.carrusel === true);

        const clasificacion = arrLibros.filter((libros) => libros.clasificacion > 3)

        res.render('inicio', {agregarCarrusel: carrusel, clasificaciones: clasificacion})
    },
    search : (req, res) => {
        const { keywords } = req.query;

        const libroBuscado = arrLibros.filter(( libro ) => libro.titulo.toLowerCase().includes(keywords.toLowerCase()));

        res.render('resultado', { resultado : libroBuscado});
    },
    /**** INICIAR SESION ****/
    renderIniciarSesion: (req, res) => {
        res.render('IniciarSesion')
    },
    redireccionarI: (req, res) => {
        const formData = req.body; 
        res.redirect("/")
    },
    /**** REGISTRARSE ****/
    renderRegistrarse : (req, res) => {
            res.render('Registrarse')
    },
    redireccionarR: (req, res) => 
        res.redirect('/')
}

module.exports = homeController;