const expressify = require('expressify');

module.exports = function statusController() {
  return expressify({
    ping
  });

  // ---

  function ping(req, res) {
    res.json({ status: 'ok' });
  }
};
