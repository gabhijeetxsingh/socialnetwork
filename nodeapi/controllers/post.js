const Post = require("../models/post");
const formidable = require('formidable');
const fs = require("fs")
const _ = require("lodash");

exports.postById = async (req, res, next, id) => {

    try {

        Post.findById(id)
            .populate("postedBy", "_id name")
            .exec((err, post) => {
                if (err || !post) {

                    return res.status(400).json({
                        error: err
                    })

                }

                req.post = post;
                next();
            })
    } catch (err) {
        console.log(err);
    }
}

exports.getPosts = async (req, res) => {

    try {

        const posts = await Post.find().populate("postedBy", "_id name").select("_id title body");
        res.json({ posts });
    } catch (err) {
        console.log(err);
    }
}

exports.createPost = (req, res) => {
    console.log(req.body)
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json(result)

        })
    })

}

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id }).populate('postedBy', "_id name")
        .select('_id title body')
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts);
        })
}

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if (!isPoster) {
        return res.status(400).json({
            error: "User is not Authorised"
        })
    }

    next();
}

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        
        res.json(post)
    })
}

// exports.updatePost = (req, res, next) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Photo could not be uploaded'
//             });
//         }
//         // save post
//         let post = req.post;
//         post = _.extend(post, fields);
//         post.updated = Date.now();

//         if (files.photo) {
//             post.photo.data = fs.readFileSync(files.photo.path);
//             post.photo.contentType = files.photo.type;
//         }

//         post.save((err, result) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 });
//             }
//             res.json(post);
//         });
//     });
// };



exports.deletePost = (req, res, next) => {
    let post = req.post;

    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        res.json({
            message: "Post deleted Successfully"
        })
    })
}