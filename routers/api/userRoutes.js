const express = require('express');
const router = express.Router();
const userApiController = require("../../controllers/api/usersApiController")

router.get("/api/users" , userApiController.list) 
router.get("/api/users/:id" ,userApiController.detail)

module.exports = router