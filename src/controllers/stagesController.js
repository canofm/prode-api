const expressify = require('expressify');

module.exports = function stagesController(
  stagesService
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
    return stagesService.get(req.params.tournamentId, req.params.stageId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return stagesService.getAll(req.params.tournamentId)
      .then(response => res.json(response));
  }

  function create(req, res) {
    return stagesService.create(req.params.tournamentId, req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return stagesService.edit(req.params.tournamentId, req.params.stageId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return stagesService.del(req.params.tournamentId, req.params.stageId)
      .then(() => res.status(204).send());
  }
};
