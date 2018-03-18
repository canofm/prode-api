const express    = require('express');
const bodyParser = require('body-parser');

module.exports = function $app(
  apiV1Router,
  errorLoggingMiddleware,
  errorMiddleware,
  ramlErrorMiddleware,
  winston2LoggerMiddleware
) {
  const app = express();

  // ---

  app.use(winston2LoggerMiddleware());
  app.use(bodyParser.json());

  // ---

  app.use(apiV1Router);

  // ---

  app.use(errorLoggingMiddleware);
  app.use(ramlErrorMiddleware);
  app.use(errorMiddleware);

  return app;
};
