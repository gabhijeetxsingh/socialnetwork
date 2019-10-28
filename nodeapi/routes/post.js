const express = require("express");
const router = express.Router();
const {getPosts, createPost} = require("../controllers/post");
const {expressJwt} = require("../controllers/auth");
const {createPostValidator} = require("../validator");


router.get('/', expressJwt, getPosts);
router.post('/post', createPostValidator, createPost);


module.exports = router;