const blogPost = require("../../schema/post");
const commentDB = require("../../schema/postComment");
const userdb = require("../../schema/userSchema");
const { userNotFound, postNotFound, commentNotFound, internalServerError } = require("../../utils/errorList");

const createComment = async (req, res) => {
  // const { postId, userId, comment, parentId } = req.body;

  // const post = await blogPost.findOne({ _id: postId })
  // if (!post) { return postNotFound(res); }

  // const user = await userdb.findOne({ _id: userId })
  // if (!user) { return userNotFound(res); }

  // const parentComment = await commentDB.findOne({ _id: parentId })
  // if (!parentComment) { return commentNotFound(res); }

  const { postId, userId, comment, parentId } = req.body;

  try {
    // Use Promise.all to execute both queries concurrently
    const [post, user, parentComment] = await Promise.all([
      blogPost.findOne({ _id: postId }),
      userdb.findOne({ _id: userId }),
      parentId ? commentDB.findOne({ _id: parentId }) : null // Only check parentComment if parentId is provided
    ]);

    // Check if post and user exist before proceeding
    if (!post) return postNotFound(res);
    if (!user) return userNotFound(res);
    if (parentId && !parentComment) return commentNotFound(res); // Check parentComment if parentId was provided

    const reply = new commentDB({
      comment,
      userId,
      postId,
      parentComment: parentId || null,
    });

    await reply.save();

    if (parentId) {
      await commentDB.findByIdAndUpdate({ _id: parentId }, {
        $push: { replies: reply._id }
      });
    }

    res.status(200).json({ message: "Success", data: reply })
  } catch (err) {
    console.error("Error in Create Comment controller", err.message);
    return internalServerError(res)
  }

}

const viewComment = async (req, res) => {
  const { postId } = req.query;

  try {
    const post = await blogPost.findOne({ _id: postId })
    if (!post) { return postNotFound(res); }

    const comments = await commentDB.find({ postId: postId, parentComment: null }) // Fetch top-level comments
      .populate({
        path: 'replies',
        populate: {
          path: 'replies', // Nested population for replies
        },
      });

    res.status(200).json({ message: "Success", data: comments });

  } catch (err) {
    console.error("Error in View Comments controller", err.message);
    return internalServerError(res)
  }
};

module.exports = {
  createComment,
  viewComment,
}