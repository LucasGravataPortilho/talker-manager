const fs = require('fs').promises;
const { join } = require('path');

const writeTalkerManagersFile = async (talker) => {
  const path = './talker.json';
  await fs.writeFile(join(__dirname, path), JSON.stringify(talker));
};

module.exports = writeTalkerManagersFile;