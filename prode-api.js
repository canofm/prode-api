const configurationFactory = require('./src/config');
const containerFactory     = require('./src/containerFactory');
// ---

if (require.main === module) {
  main();
}

// ---

function main() {
  containerFactory.createContainer().resolve(function (app, config, logger) {
    app.listen(config.express.port, config.express.host, () => {
      logger.info('listening on %s:%s ...', config.express.host, config.express.port);
    });
  });
}
