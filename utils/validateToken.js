const jwt = require("jsonwebtoken");
const { cookieTokenName } = require("../constant/tokenConstant");
const userdb = require("../schema/userSchema");

const authenticateToken = async (req, res, next) => {
  let token = req.header('Authorization') // Get the token from authorization
  // const token = req.cookies[cookieTokenName]; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: "Authorization denied. Please login first" });
  }
  token = token.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const user = await userdb.findOne({ _id: decoded._id })
    if (!user) {  return res.status(401).json({ message: "Token is invalid or expired. Please login again." }); }

    req.user = decoded; // Attach the decoded user details to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired. Please login again." });
  }
};

module.exports = authenticateToken;
