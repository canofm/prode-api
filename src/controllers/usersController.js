const expressify = require('expressify');

module.exports = function usersController(
  usersService
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
    return usersService.get(req.params.userId)
      .then(response => res.json(response));
  }

  function getAll(req, res) {
    return usersService.getAll()
      .then(response => res.json(response));
  }

  function create(req, res) {
    return usersService.create(req.body)
      .then(id => res.status(201).send(id));
  }

  function edit(req, res) {
    return usersService.edit(req.params.userId, req.body)
      .then(response => res.json(response));
  }

  function del(req, res) {
    return usersService.del(req.params.userId)
      .then(() => res.status(204).send());
  }
};
