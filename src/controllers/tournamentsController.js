const expressify = require('expressify');

module.exports = function tournamentsController(
  tournamentsService
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
    return tournamentsService.get(req.params.tournamentId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return tournamentsService.getAll()
      .then(response => res.json(response));
  }

  function create(req, res) {
    return tournamentsService.create(req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return tournamentsService.edit(req.params.tournamentId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return tournamentsService.del(req.params.tournamentId)
      .then(() => res.status(204).send());
  }
};
