const express = require('express');
const router = express.Router();
const genresApiController = require("../../controllers/api/genresApiController")

router.get("/api/genres" , genresApiController.list) 


module.exports = router