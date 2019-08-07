const Post = require("../models/post");

exports.getPosts = async (req , res) => {

	try {

		const posts = await Post.find().select("_id title body");
		res.json({posts});
	}
	catch(err) {
		console.log(err);
	}
}

exports.createPost = (req, res) => {

	const post = new Post(req.body);

	post.save().then(result => {
		res.json({
			post : result
		})
	})
}