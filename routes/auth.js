const express = require('express');
const { login, signup } = require('../controller/Auth/auth.controller');
const router = express.Router();

router.post("/login", login);

router.post("/signup", signup)

module.exports = router;
