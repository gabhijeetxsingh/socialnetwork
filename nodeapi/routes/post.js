const express = require("express");
const router = express.Router();
const {getPosts, createPost} = require("../controllers/post");
const validator = require("../validator/index");


router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);


module.exports = router;