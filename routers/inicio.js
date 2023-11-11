const express = require('express');
const router = express.Router();
const homeController= require('../controllers/homeController');
const authMiddleware = require("../middlewares/authMiddleware")

// ****MIDDLEWARES**** //
const upload = require("../middlewares/multer")
const guestMiddleware = require("../middlewares/guestMiddleware")
// ****MIDDLEWARES VALIDACION **** //
const { arrRegister,validateRegister} = require ("../middlewares/validateRegister")

/**** INICIO ****/
router.get('/', homeController.renderHome);
router.get('/search', homeController.search);

/**** IniciarSesion ****/
router.get('/iniciar-sesion', guestMiddleware ,homeController.renderIniciarSesion);
router.post('/iniciar-sesion', homeController.redireccionarI);

/**** REGISTRARSE ****/
router.get('/registrarse', guestMiddleware  ,homeController.renderRegistrarse);
router.post('/registrarse', upload.single("image"), arrRegister , validateRegister , homeController.createUser)
// PERFIL
router.get("/UserProfile" , authMiddleware  ,homeController.renderUserProfile)
// LOGOUT
router.get("/logout",homeController.logout)
module.exports = router
