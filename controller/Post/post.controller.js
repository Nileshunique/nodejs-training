const userdb = require("../../schema/userSchema");
const { userNotFound } = require("../../utils/errorList");
const blogPost = require("./../../schema/post")

const getPost = async (req, res) => {
  const postId = req.query.postId;
  if (postId) {
    const post = await blogPost.find({ _id: postId, $or: [{ delete: false }, { delete: { $exists: false } }] });
    res.status(200).json({ message: "Success", data: post });
  } else {
    const posts = await blogPost.find({ $or: [{ delete: false }, { delete: { $exists: false } }] }).sort({ updatedAt: -1 }).limit(2);
    res.status(200).json({ message: "Success", data: posts });
  }
}

const getPosts = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(403).json({ message: "User Id is required" })
  }

  const user = await userdb.findOne({ _id: userId })
  if (!user) { return userNotFound(res); }

  const posts = await blogPost.find({ userId: userId, $or: [{ delete: false }, { delete: { $exists: false } }] });
  res.status(200).json({ message: "Success", data: posts });
}

const createPost = async (req, res) => {
  const { title, blog, userId } = req.body;
  if (!title || !blog || !userId) {
    res.status(403).json({ message: "Please enter all details" })
  }

  const user = await userdb.findOne({ _id: userId })
  if (!user) { return userNotFound(res); }

  const post = new blogPost({ title, blog, userId });
  await post.save();
  res.status(200).json({ message: "Success", data: post })
}

const updatePost = async (req, res) => {
  const { title, blog, postId, userId } = req.body;

  if (!title || !blog || !postId || !userId) {
    res.status(403).json({ message: "Please enter all details" })
  }

  const user = await userdb.findOne({ _id: userId })
  if (!user) { return userNotFound(res); }

  // const post = new blogPost({ title, blog, userId });
  const post = await blogPost.findOneAndUpdate({ _id: postId, userId: userId, $or: [{ delete: false }, { delete: { $exists: false } }] }, { title, blog }, { new: true })
  // await post.save();
  res.status(200).json({ message: "Success", data: post })

}

const deletePost = async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    res.status(403).json({ message: "Please enter all detail." })
  }

  const user = await userdb.findOne({ _id: userId })
  if (!user) { return userNotFound(res); }

  const post = await blogPost.findOneAndUpdate({ _id: postId, userId: userId }, { delete: true }, { new: true })
  // await post.save();
  res.status(200).json({ message: "Success", data: post })

}

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}