var express = require('express');
const { getPost, createPost, getPosts, updatePost, deletePost } = require('../controller/Post/post.controller');
const { createComment, viewComment } = require('../controller/Post/comment.controller');
const { markLike } = require('../controller/Post/reaction.controller');
const authenticateToken = require('../utils/validateToken');

var router = express.Router();

router.get('/getPost', getPost);
router.get('/getPosts', getPosts);
router.post('/createPost', authenticateToken, createPost);
router.put('/updatePost', authenticateToken, updatePost);
router.delete('/deletePost', authenticateToken, deletePost);

router.get("/viewComment", viewComment);
router.post("/createComment", authenticateToken, createComment);

router.post("/markLike", authenticateToken, markLike);
// router.post("/markFavorites", markFavorites);

module.exports = router;