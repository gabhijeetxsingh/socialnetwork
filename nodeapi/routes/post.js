const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/post");
const validator = require("../validator/index");


router.get('/', postControllers.getPosts);
router.post('/post', validator.createPostValidator, postControllers.createPost);


module.exports = router;