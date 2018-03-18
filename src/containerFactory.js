const dependable = require('dependable');
const path = require('path');

function createContainer() {
  const container = dependable.container();
  const entries   = [
    'app.js',
    'config.js',
    'controllers',
    'logger.js',
    'middlewares',
    'routers',
    'services',
    'utils'
  ];

  entries.forEach((entry) => container.load(path.join(__dirname, entry)));
  return container;
}

module.exports = {
  createContainer
};
