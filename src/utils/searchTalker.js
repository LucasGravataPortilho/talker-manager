const readTalkerManagersFile = require('../readTalkers');

const searchTalkers = async (query) => {
    const managers = await readTalkerManagersFile();
  
    const manager = managers.filter((m) => m.name.includes(query));
  
    return manager;
  };

module.exports = searchTalkers;