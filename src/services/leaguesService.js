const bluebird = require('bluebird');

module.exports = function leaguesService(
  inscriptionsService,
  leaguesRepository
) {
  return {
    get,
    getAll,
    getByIds,
    create,
    edit,
    del,
    getLeaguesForUser,
    addUserToLeague,
    removeUserFromLeague
  };

  // ---

  function get(leagueId) {
    return leaguesRepository.get(leagueId);
  }

  function getAll() {
    return leaguesRepository.getAll();
  }

  function getByIds(ids) {
    return leaguesRepository.getByIds(ids || []);
  }

  function create(league) {
    return leaguesRepository.create(league);
  }

  function edit(league) {
    return leaguesRepository.edit(league);
  }

  function del(leagueId) {
    return leaguesRepository.del(leagueId)
  }

  function getLeaguesForUser(userId) {
    return inscriptionsService.getInscriptionsForUser(userId);
  }

  function addUserToLeague(userId, leagueId) {
    return inscriptionsService.enrollUser(userId, leagueId);
  }

  function removeUserFromLeague(userId, leagueId) {
    return inscriptionsService.unenrollUser(userId, leagueId);
  }
};
