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

router.put('/:id', validation, async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const { id } = req.params;
    const managers = await readTalkerManagersFile();
    const managerIndex = managers.findIndex((m) => m.id === +id);

    if (managerIndex === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    managers[managerIndex] = {
        ...managers[managerIndex],
        name,
        age,
        talk: { watchedAt, rate },
    };

    await writeTalkerManagersFile(managers);
    res.status(200).json(managers[managerIndex]);
});

router.delete('/:id', tokenValidation, async (req, res) => {
    const id = Number(req.params.id);
    const managers = await readTalkerManagersFile();
    const manager = managers.find((t) => t.id === id);
    const index = managers.indexOf(manager);
    managers.splice(index, 1);
    await writeTalkerManagersFile(managers);
    res.sendStatus(204).end();
  });

module.exports = router;