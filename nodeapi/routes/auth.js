const express = require("express");
const router = express.Router();
const {signup} = require("../controllers/auth");
const validator = require("../validator/index");


router.post('/signup', signup);


module.exports = router;