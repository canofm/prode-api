const expressify = require('expressify');

module.exports = function matchesController(
  matchesService
) {
  return expressify({
    get,
    getAll,
    create,
    edit,
    del
  });

  // ---

  function get(req, res) {
    return matchesService.get(req.params.tournamentId, req.params.stageId, req.params.matchId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return matchesService.getAll(req.params.tournamentId, req.params.stageId)
      .then(response => res.json(response));
  }

  function create(req, res) {
    return matchesService.create(req.params.tournamentId, req.params.stageId, req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return matchesService.edit(req.params.tournamentId, req.params.stageId, req.params.matchId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return matchesService.del(req.params.tournamentId, req.params.stageId, req.params.matchId)
      .then(() => res.status(204).send());
  }
};
