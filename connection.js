const mongoose = require('mongoose');
require("./schema/post");
require("./schema/postComment");
require("./schema/userSchema");

const DB = process.env.MONGODB_URL;

mongoose.connect(DB).then(() => {
  console.log('Database Connected')
}).catch((err) => {
  console.log('err', err)
});
