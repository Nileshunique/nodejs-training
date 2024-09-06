const blogPost = require("../../schema/post");
const userdb = require("../../schema/userSchema");
const { internalServerError, postNotFound, userNotFound } = require("../../utils/errorList");

const markLike = async (req, res) => {
  const { postId, userId, reactionType = "like" } = req.body;

  try {

    const [getPost, user] = await Promise.all([
      blogPost.findOne({ _id: postId }),
      userdb.findOne({ _id: userId }),
    ]);

    if (!getPost) return postNotFound(res);
    if (!user) return userNotFound(res);

    const post = await blogPost.findOneAndUpdate(
      { _id: postId, [`reactions.${reactionType}.users`]: { $ne: userId } }, // Ensure the user hasn't reacted before
      {
        $inc: { [`reactions.${reactionType}.count`]: 1 },
        $push: { [`reactions.${reactionType}.users`]: userId },
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'user already reacted' });
    }

    await userdb.findOneAndUpdate(
      { _id: userId },
      {
        $push: { [`reactions.${reactionType}Posts`]: postId },
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.status(200).json({ message: 'Reaction updated', data: post });
  } catch (err) {
    console.error("Error in Create Comment controller", err.message);
    return internalServerError(res)
  }
}

module.exports = {
  markLike,
}