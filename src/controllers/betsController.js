const expressify = require('expressify');

module.exports = function betsController(
  betsService
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
    return betsService.get(req.params.userId, req.params.betId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return betsService.getAll(req.params.userId)
      .then(response => res.json(response));
  }

  function create(req, res) {
    return betsService.create(req.params.userId, req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return betsService.edit(req.params.userId, req.params.betId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return betsService.del(req.params.userId, req.params.betId)
      .then(() => res.status(204).send());
  }
};
