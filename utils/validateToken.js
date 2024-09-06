const jwt = require("jsonwebtoken");
const { cookieTokenName } = require("../constant/tokenConstant");

const authenticateToken = (req, res, next) => {
  const token = req.cookies[cookieTokenName]; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: "Authorization denied. Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user details to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired. Please log in again." });
  }
};

module.exports = authenticateToken;
