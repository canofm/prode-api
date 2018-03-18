const bluebird = require('bluebird');

module.exports = function usersService() {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(userId) {
    return bluebird.resolve({
      id:   userId,
      name: 'cucho'
    });
  }

  function getAll() {
    return bluebird.resolve([{
      id:   1,
      name: 'cucho'
    }, {
      id:   2,
      name: 'gatito'
    }]);
  }

  function create() {
    return bluebird.resolve(9);
  }

  function edit(userId) {
    return bluebird.resolve({
      id:   userId,
      name: 'qq'
    });
  }

  function del() {
    return bluebird.resolve();
  }
};
