const mongoose = require('mongoose');
const multer = require('multer');
const HTTPStatus = require('http-status');

const Post = mongoose.model('Post');


const MIME_TYPE_MAP = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',

}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

exports.uploadImage = multer({ storage }).single('image');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ _id: 'asc' });
  res.status(HTTPStatus.OK).json(posts);
};

exports.cratePost = async (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  req.body.imagePath = baseUrl + '/images/' + req.file.filename;
  const post = await new Post(req.body).save()
  res.status(HTTPStatus.CREATED).json(post);
}

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  await Post.deleteOne({ _id: postId });
  res.status(HTTPStatus.OK).json({ message: "Post deleted!" });
}

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const post = {
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  }
  await Post.updateOne({ _id: postId }, post);
  res.status(HTTPStatus.OK).json({ message: "Post updated successfully!" });
}

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(HTTPStatus.OK).json(post);
  } else {
    res.status(HTTPStatus.NOT_FOUND).json({ message: 'Post not found!' });
  }
};