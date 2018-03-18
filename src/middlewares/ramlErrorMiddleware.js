const errors = require('http-errors');

module.exports = function ramlErrorMiddleware() {
  return function innerRamlErrorMiddleware(err, req, res, next) {
    // Piping the response to the client
    if (res.headersSent || !err.ramlNotFound) {
      // Express handle the error and stop sending data to the client
      return next(err);
    }

    // eslint-disable-next-line no-param-reassign
    err = new errors.NotFound();

    return res.status(err.status).json({
      name:    err.name,
      status:  err.status,
      message: err.message,
      details: err.details
    });
  };
};
