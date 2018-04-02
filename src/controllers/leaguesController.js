const expressify = require('expressify');

module.exports = function leaguesController(
  leaguesService
) {
  return expressify({
    get,
    getAll,
    create,
    edit,
    del,
    getLeaguesForUser,
    addUserToLeague,
    removeUserFromLeague
  });

  // ---

  function get(req, res) {
    return leaguesService.get(req.params.leagueId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return leaguesService.getAll()
      .then(response => res.json(response));
  }

  function create(req, res) {
    return leaguesService.create(req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return leaguesService.edit(req.params.leagueId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return leaguesService.del(req.params.leagueId)
      .then(() => res.status(204).send());
  }

  function getLeaguesForUser(req, res) {
    return leaguesService.getLeaguesForUser(req.params.userId)
      .then(response => res.json(response));
  }

  function addUserToLeague(req, res) {
    return leaguesService.addUserToLeague(req.params.userId, req.params.leagueId)
      .then(id => res.status(201).send(id));
  }

  function removeUserFromLeague(req, res) {
    return leaguesService.removeUserFromLeague(req.params.userId, req.params.leagueId)
      .then(id => res.status(201).send(id));
  }
};
