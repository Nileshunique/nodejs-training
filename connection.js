const mongoose = require('mongoose');
const DB = process.env.MONGODB_URL;

mongoose.connect(DB).then(() => {
  console.log('Database Connected')
}).catch((err) => {
  console.log('err', err)
});
