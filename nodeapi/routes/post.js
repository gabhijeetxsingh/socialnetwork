const express = require("express");
const router = express.Router();
const {getPosts, createPost} = require("../controllers/post");
const {createPostValidator} = require("../validator");


router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);


module.exports = router;