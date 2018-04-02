const bluebird = require('bluebird');

module.exports = function usersService(
  inscriptionsService,
  usersRepository
) {
  return {
    get,
    getAll,
    getByIds,
    getUsersInLeague,
    create,
    edit,
    del
  };

  // ---

  function get(userId) {
    return usersRepository.get(userId);
  }

  function getAll() {
    return usersRepository.getAll();
  }

  function getByIds(ids) {
    return usersRepository.getByIds(ids || []);
  }

  function getUsersInLeague(leagueId) {
    return inscriptionsService.getUsersInLeague(leagueId);
  }

  function create(user) {
    return usersRepository.create(user);
  }

  function edit(user) {
    return usersRepository.edit(userId, user);
  }

  function del(userId) {
    return usersRepository.del(userId);
  }
};
