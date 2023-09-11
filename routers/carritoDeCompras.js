const express = require('express');
const router = express.Router();
const carritodecompraController= require('../controllers/carritodecompra');

router.get('/', carritodecompraController.renderCarrito);

module.exports = router