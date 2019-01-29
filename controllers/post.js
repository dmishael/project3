const Post = require('../models/Post')
const User = require('../models/User')


const postController = {
    index: (req, res) => {
        Post.find({})
            .then((posts) => {
                res.send(posts)
            })
    },
    create: (req, res) => {
        var userId = req.params.userId
        User.findById(userId)
            .then((user) => {
                Post.create(req.body)
                    .then((newPost) => {
                        user.posts.push(newPost)
                        user.save()
                        res.send(newPost)
                    })
            })
    },
    show: (req, res) => {
        const postId = req.params.postId
        console.log(postId)
        Post.findById(postId).then((post) => {
            res.send(post)

        })
    },
    update: (req, res) => {
        var postId = req.params.postId
        Post.findByIdAndUpdate(postId, req.body, { new: true })
            .then((newPost) => {
                newPost.save()
                res.send(newPost)
            })
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.postId)
            .then(() => {
                res.send(200)
            })
    }
}


module.exports = postController