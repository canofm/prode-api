const bluebird = require('bluebird');
const uuid     = require('uuid');

module.exports = function authService() {
  return {
    login
  };

  // ---

  function login(username, password) {
    if (username === 'cucho' && password === 'sibabe') {
      return bluebird.resolve(uuid.v4());
    }

    return bluebird.reject('LOLNOPE');
  }
};
