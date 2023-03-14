const express = require('express');
const existingId = require('../middlewares/existingId');
const readTalkerManagersFile = require('../readTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
    const managers = await readTalkerManagersFile();
    res.status(200).json(managers);
});

router.get('/:id', existingId, async (req, res) => {
    const id = Number(req.params.id);
    const managers = await readTalkerManagersFile();
    const manager = managers.find((t) => t.id === id);
    res.status(200).json(manager);
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const getToken = Math.random().toString(16).substring(2);
    res.status(200).json({ token: getToken });
});

module.exports = router;