const express = require('express');
const readTalkerManagersFile = require('../readTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
    const managers = await readTalkerManagersFile();
    res.status(200).json(managers);
});

module.exports = router;