const mongoose = require('mongoose');
const HTTPStatus = require('http-status');
const Post = mongoose.model('Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ _id: 'asc' });
  res.status(HTTPStatus.OK).json(posts);
};

exports.cratePost = async (req, res) => {
  const post = await new Post(req.body).save()
  res.status(HTTPStatus.CREATED).json(post);
}

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  await Post.deleteOne({ _id: postId });
  res.status(HTTPStatus.OK).json({ message: "Post deleted!" });;
}