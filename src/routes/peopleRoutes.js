const express = require('express');
const existingId = require('../middlewares/existingId');
const managerValidation = require('../middlewares/managerValidation');
const { talkValidation, watchedAtValidation,
    rateValidation } = require('../middlewares/talkValidation');
const tokenValidation = require('../middlewares/tokenValidation');
const readTalkerManagersFile = require('../readTalkers');
const writeTalkerManagersFile = require('../WriteTalkers');

const router = express.Router();

const validation = [tokenValidation, managerValidation,
    talkValidation, watchedAtValidation, rateValidation];

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

router.post('/', validation, async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const managers = await readTalkerManagersFile();

    const newManager = {
        id: managers.length + 1,
        name,
        age,
        talk: { watchedAt, rate },
    };

    await writeTalkerManagersFile([...managers, newManager]);

    res.status(201).json(newManager);
});

module.exports = router;