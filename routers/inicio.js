const express = require('express');
const router = express.Router();
const homeController= require('../controllers/homeController');
 
// ****MIDDLEWARES**** //
const upload = require("../middlewares/multer")
// ****MIDDLEWARES VALIDACION **** //
const { arrRegister,validateRegister} = require ("../middlewares/validateRegister")

/**** INICIO ****/
router.get('/', homeController.renderHome);
router.get('/search', homeController.search);

/**** IniciarSesion ****/
router.get('/iniciar-sesion', homeController.renderIniciarSesion);
router.post('/iniciar-sesion', homeController.redireccionarI);

/**** REGISTRARSE ****/
router.get('/registrarse', homeController.renderRegistrarse);
router.post('/registrarse', upload.single("image"), arrRegister , validateRegister , homeController.createUser)


module.exports = router
