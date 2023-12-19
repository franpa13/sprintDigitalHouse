const express = require('express');
const router = express.Router();
const productsApiController = require("../../controllers/api/productsApiController")
 
router.get("/api/products" , productsApiController.list) 
router.get("/api/products/:id" ,productsApiController.detail)

module.exports = router