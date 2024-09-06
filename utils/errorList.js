const internalServerError = (res) => res.status(500).json({ error: "Internal Server Error" })
const userNotFound = (res) => res.status(401).json({ error: "User not found" })
const userAlreadyRegister = (res) => res.status(401).json({ error: "User already registered" });
const passwordNotMatch = (res) => res.status(401).json({ error: "Password not match" });
const enterAllDetails = (res) => res.status(401).json({ error: "Please Enter All Details" });
const postNotFound = (res) => res.status(401).json({ error: "Post not found" })
const commentNotFound = (res) => res.status(401).json({ error: "Parrent Comment not found" })

module.exports = {
  userNotFound,
  userAlreadyRegister,
  passwordNotMatch,
  internalServerError,
  enterAllDetails,
  postNotFound,
  commentNotFound,
}