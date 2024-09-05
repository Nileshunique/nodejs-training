
const bcrypt = require('bcrypt');
const userdb = require('./../../schema/userSchema');
const { userAlreadyRegister, userNotFound, passwordNotMatch, internalServerError, enterAllDetails } = require('../../utils/errorList');
const generateTokenAndSetCookies = require('../../utils/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { return enterAllDetails(res); }

    const user = await userdb.findOne({ email: email })
    if (!user) { return userNotFound(res); }

    const userDetail = userCreate(user);
    const token = generateTokenAndSetCookies(userDetail, res);
    return res.status(200).json({ ...userDetail, ...token })
  } catch (err) {
    console.error("Error in login controller", err.message);
    return internalServerError(res)
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) { return enterAllDetails(res); }
    if (password !== confirmPassword) { return passwordNotMatch(res); }
    const finduser = await userdb.findOne({ email: email })
    if (finduser) { return userAlreadyRegister(res); }

    const salt = await bcrypt.genSalt(10); // the higher it is the better it is but the slower it is.
    const hashedPassword = await bcrypt.hash(password, salt)

    const createUser = new userdb({
      email: email,
      password: hashedPassword,
    })
    await createUser.save();
    const userDetail = userCreate(createUser);

    const token = generateTokenAndSetCookies(userDetail, res);
    return res.status(200).json({ ...userDetail, ...token })
  } catch (err) {
    console.error("Error in register controller", err.message);
    return internalServerError(res)
  }

}

module.exports = {
  login,
  signup,
}

const userCreate = (user) => {
  return {
    _id: user._id,
    email: user.email
  }
}