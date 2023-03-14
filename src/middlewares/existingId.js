const readTalkerManagersFile = require('../readTalkers');

const existingId = async (req, res, next) => {
    const { id } = req.params;
    const managers = await readTalkerManagersFile();
    const manager = managers.some((t) => t.id === Number(id));
    if (!manager) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    next();
  };

module.exports = existingId;