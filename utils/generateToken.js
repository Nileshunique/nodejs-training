const jwt = require("jsonwebtoken");
const { cookieTokenName, cookieRefreshTokenName } = require("../constant/tokenConstant");

const expireDays = 2;

const generateTokenAndSetCookies = (userDetail, res) => {
  const token = generateToken(userDetail, res)
  const refreshtoken = jwt.sign({ ...userDetail, refresh: true }, process.env.JWT_SECRET)
  res.cookie(cookieRefreshTokenName, token, {
    maxAge: 365 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevent xss attacks / cross-site scripting attacks
    sameSite: "strict", // CSRF attack protection / cross-site request forgery attecks protection
    secure: process.env.NODE_ENV !== "development",
  })

  return { token, refreshToken: refreshtoken };
  // jwtToken name can be changed
  // 2 days, 24 hour, 60 minutes, 60 seconds, 1000 milliseconds
  // httpOnly: true, it means it can be only accessed by http not javaScript.
}

module.exports = generateTokenAndSetCookies;

/**
 * openssl rand -base64 32  
 * => this command is use to generate the secret key
 * => we have to run this command in terminal
 */

const generateToken = (userDetail, res) => {
  const token = jwt.sign({ ...userDetail }, process.env.JWT_SECRET, { expiresIn: `${expireDays}d` })
  res.cookie(cookieTokenName, token, {
    maxAge: expireDays * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevent xss attacks / cross-site scripting attacks
    sameSite: "strict", // CSRF attack protection / cross-site request forgery attecks protection
    secure: process.env.NODE_ENV !== "development",
  })
  return token;
}