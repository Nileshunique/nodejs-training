const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  loginTypeId: { type: String, },
  firstName: { type: String, },
  lastName: { type: String, },
  displayName: { type: String, default: this.firstName ? this.firstName + ' ' + this.lastName : "", },
  email: { type: String, },
  password: { type: String, },// required: true,
  image: { type: String, },
  signupType: { type: String, default: "site", },
  reactions: {
    likePosts: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
    funnyPosts: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
    wowPosts: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;