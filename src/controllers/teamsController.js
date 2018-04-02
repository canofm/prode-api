const expressify = require('expressify');

module.exports = function teamsController(
  teamsService
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
    return teamsService.get(req.params.teamId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return teamsService.getAll()
      .then(response => res.json(response));
  }

  function create(req, res) {
    return teamsService.create(req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return teamsService.edit(req.params.teamId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return teamsService.del(req.params.teamId)
      .then(() => res.status(204).send());
  }
};
