const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  delete: Boolean,
  blog: String,
  userId: String,
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now },
  // comments: [{ body: String, date: Date }],
});

const blogPost = new mongoose.model('Blog', blogSchema);

module.exports = blogPost;