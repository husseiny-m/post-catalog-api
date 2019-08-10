const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);