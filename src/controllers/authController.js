const expressify = require('expressify');

module.exports = function authController(
  authService
) {
  return expressify({
    login
  });

  // ---

  function login(req, res) {
    return authService.login(req.body.username, req.body.password)
      .then(response => res.json(response));
  }
};
