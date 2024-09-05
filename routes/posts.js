var express = require('express');
const { getPost, createPost, getPosts, updatePost, deletePost } = require('../controller/Post/post.controller');
var router = express.Router();

router.get('/getPost', getPost);
router.get('/getPosts', getPosts);
router.post('/createPost', createPost);
router.put('/updatePost', updatePost);
router.delete('/deletePost', deletePost);


module.exports = router;