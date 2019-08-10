const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema(
  {
    email: String,
    testResult: String,
  }
);


module.exports = mongoose.model('User', userSchema);
