const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    const getToken = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token: getToken });
});

module.exports = loginRouter;