const fs = require('fs').promises;
const { join } = require('path');

const readTalkerManagersFile = async () => {
    const path = './talker.json';
    try {
      const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
      return JSON.parse(contentFile);
    } catch (error) {
      return null;
    }
  };

module.exports = readTalkerManagersFile;