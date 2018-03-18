const _ = require('lodash');

// ---

module.exports = {
  express: {
    port: _.get(process.env, 'PORT', 3000)
  }
};
