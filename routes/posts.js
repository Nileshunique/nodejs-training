var express = require('express');
const { getPost, createPost, getPosts, updatePost, deletePost } = require('../controller/Post/post.controller');
const { createComment, viewComment } = require('../controller/Post/comment.controller');

var router = express.Router();

router.get('/getPost', getPost);
router.get('/getPosts', getPosts);
router.post('/createPost', createPost);
router.put('/updatePost', updatePost);
router.delete('/deletePost', deletePost);

router.get("/viewComment", viewComment);
router.post("/createComment", createComment);

module.exports = router;