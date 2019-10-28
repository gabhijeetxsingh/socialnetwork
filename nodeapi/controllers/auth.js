const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require("../models/user");
require("dotenv").config();

exports.signup = async (req , res) => {

	try {

		const userExists = await User.findOne({email: req.body.email});
		if(userExists) {
			return res.status(403).json({
				email : "Email has taken!"
			})
		}

		const user = await new User(req.body);
		await user.save();
		res.status(200).json({message : "Signup success! please login"});
	}
	catch(err) {
		console.log(err);
	}
}

exports.signin = async (req , res) => {

	try {
		const {email , password} = req.body;
		User.findOne({email} , (err, user)=> {
			//if err or no user
			if(err || !user) {
				return res.status(401).json({
					error : "User with that email doest not exists. please signin"
				})
			}

			if(!user.authenticate(password)) {
				return res.status(401).json({
					error : "Email and password do not match"
				})
			}

			const token = jwt.sign({_id : user._id} , process.env.JWT_SECRET);

			res.cookie("t", token, {expire : new Date() + 9999});

			const { _id, name, email} = user
			return res.json({token, user : {_id , name, email}})
		})


	}
	catch(err) {
		console.log(err);
	}
}

exports.signout = async (req , res) => {

	try {
		
		res.clearCookie("t");
		return res.json({message : "Signout success!"})

	}
	catch(err) {
		console.log(err);
	}
}


exports.requireSignin = expressJwt({
	//if the token is valid, express jwt appends the verified users id
	//in an auth key to requst object
	secret : process.env.JWT_SECRET,
	userProperty: "auth"
})
