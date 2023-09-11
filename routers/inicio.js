const express = require('express');
const router = express.Router();
const homeController= require('../controllers/homeController');

/**** INICIO ****/
router.get('/', homeController.renderHome);
router.get('/search', homeController.search);

/**** IniciarSesion ****/
router.get('/iniciar-sesion', homeController.renderIniciarSesion);
router.post('/iniciar-sesion', homeController.redireccionarI);

/**** REGISTRARSE ****/
router.get('/registrarse', homeController.renderRegistrarse);
router.post('/registrarse', homeController.redireccionarR)

module.exports = router