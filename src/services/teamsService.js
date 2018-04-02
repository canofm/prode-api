const bluebird = require('bluebird');

module.exports = function teamsService(
  teamsRepository
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(teamId) {
    return teamsRepository.get(teamId);
  }

  function getAll() {
    return teamsRepository.getAll();
  }

  function create(team) {
    return teamsRepository.create(team);
  }

  function edit(team) {
    return teamsRepository.edit(team);
  }

  function del(teamId) {
    return teamsRepository.del(teamId);
  }
};
