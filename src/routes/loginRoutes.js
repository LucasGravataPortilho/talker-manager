const express = require('express');
const crypto = require('crypto');
const validateLogin = require('../middlewares/validateLogin');
const validateLoginRules = require('../middlewares/validateLoginRules');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, validateLoginRules, (req, res) => {
    const getToken = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token: getToken });
});

module.exports = loginRouter;