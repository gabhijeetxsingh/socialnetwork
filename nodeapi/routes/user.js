const express = require("express");
const router = express.Router();
const {userById, allUsers, getUser} = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");


router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;