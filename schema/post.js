const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  delete: Boolean,
  blog: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now },
});

const blogPost = new mongoose.model('Blog', blogSchema);

module.exports = blogPost;