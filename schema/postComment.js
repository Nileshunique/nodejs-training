const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId, ref: 'Blog', required: true }, // Reference to the post
  comment: { type: String, required: true }, // Comment content
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true }, // Reference to the user
  parentComment: { type: mongoose.Types.ObjectId, ref: 'comments', default: null }, // Reference to parent comment for threading
  replies: [{ type: mongoose.Types.ObjectId, ref: 'comments' }], // Array to hold reply comments
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

const commentDB = new mongoose.model("comments", commentSchema);

module.exports = commentDB;