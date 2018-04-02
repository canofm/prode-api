const bluebird = require('bluebird');

module.exports = function betsService(
  betsRepository
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(userId, betId) {
    return betsRepository.get(userId, betId);
  }

  function getAll(userId) {
    return betsRepository.getAll(userId);
  }

  function create(userId, bet) {
    return betsRepository.create(bet);
  }

  function edit(userId, bet) {
    return betsRepository.edit(userId, bet);
  }

  function del(userId, betId) {
    return betsRepository.del(userId, betId);
  }
};
