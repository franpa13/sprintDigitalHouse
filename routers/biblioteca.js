const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware  = require("../middlewares/authMiddleware")
const bibliotecaController = require('../controllers/BibliotecaController');
/*const { route } = require('./inicio');*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathimage = path.join(__dirname, '..', 'public', 'images');
        cb(null, pathimage);
    },
    filename: (req, file, cb)=>{
        const fileNewName = 'img-' + Date.now() + path.extname(file.originalname);

        cb(null, fileNewName)
    }
})

const upload = multer({ storage })

/**** BIBLIOTECA ****/
router.get('/', bibliotecaController.render);

/**** CREAR ****/
router.get('/CreacionDeProductos',authMiddleware ,  bibliotecaController.renderCrearProductos);
router.post('/CreacionDeProductos',upload.single("img"), bibliotecaController.crear);

/**** DETALLE ****/
router.get('/detalle/:id', bibliotecaController.renderDetalle);

/**** EDITAR ****/
router.get('/editar/:id', authMiddleware ,  bibliotecaController.rendermodificarProductos);
router.put('/editar/:id', upload.single("img"), bibliotecaController.editando);

/**** ELIMINAR ****/
router.delete('/delete/:id',authMiddleware ,  bibliotecaController.eliminar);

module.exports = router;

