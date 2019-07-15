const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/post");


router.get('/', postControllers.getPosts);
router.post('/post', postControllers.createPost);


module.exports = router;