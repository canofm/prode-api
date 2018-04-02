const bluebird = require('bluebird');

module.exports = function matchesService(
  matchesRepository
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(tournamentId, stageId, matchId) {
    return matchesRepository.get(tournamentId, stageId, matchId);
  }

  function getAll(tournamentId, stageId) {
    return matchesRepository.getAll(tournamentId, stageId);
  }

  function create(tournamentId, stageId, match) {
    return matchesRepository.create(match);
  }

  function edit(tournamentId, stageId, match) {
    return matchesRepository.edit(tournamentId, stageId, match);
  }

  function del(tournamentId, stageId, matchId) {
    return matchesRepository.del(tournamentId, stageId, matchId);
  }
};
