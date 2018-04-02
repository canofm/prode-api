const bluebird = require('bluebird');

module.exports = function stagesService(
  stagesRepository
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(tournamentId, stageId) {
    return stagesRepository.get(tournamentId, stageId);
  }

  function getAll(tournamentId) {
    return stagesRepository.getAll(tournamentId);
  }

  function create(tournamentId, stage) {
    return stagesRepository.create(stage);
  }

  function edit(tournamentId, stageId, stage) {
    return stagesRepository.edit(tournamentId, stage);
  }

  function del(tournamentId, stageId) {
    return stagesRepository.del(tournamentId, stageId);
  }
};
