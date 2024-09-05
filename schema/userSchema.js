const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  loginTypeId: { type: String, },
  firstName: { type: String, },
  lastName: { type: String, },
  displayName: { type: String, default: this.firstName ? this.firstName + ' ' + this.lastName : "", },
  email: { type: String, },
  password: { type: String, },// required: true,
  image: { type: String, },
  signupType: { type: String, default: "site", }
}, { timestamps: true });

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;