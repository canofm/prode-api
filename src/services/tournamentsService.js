const bluebird = require('bluebird');

module.exports = function tournamentsService(
  tournamentsRepository
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(tournamentId) {
    return tournamentsRepository.get(tournamentId);
  }

  function getAll() {
    return tournamentsRepository.getAll();
  }

  function create(tournament) {
    return tournamentsRepository.create(tournament);
  }

  function edit(tournament) {
    return tournamentsRepository.edit(tournament);
  }

  function del(tournamentId) {
    return tournamentsRepository.del(tournamentId);
  }
};
