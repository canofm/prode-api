const dependable = require('dependable');
const path = require('path');

function createContainer() {
  const container = dependable.container();
  const entries   = [
    'app.js',
    'config.js',
    'controllers',
    'db',
    'logger.js',
    'middlewares',
    'repositories',
    'repositories/mappers',
    'routers',
    'services',
    'utils'
  ];

  entries.forEach((entry) => container.load(path.join(__dirname, entry)));

  container.register('container', container);

  return container;
}

module.exports = {
  createContainer
};
