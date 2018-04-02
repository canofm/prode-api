const express = require('express');
const ospreyMiddleware = require('osprey-middleware');

module.exports = function apiV1Router(
  config,

  betsController,
  authController,
  teamsController,
  stagesController,
  leaguesController,
  matchesController,
  tournamentsController,
  usersController,

  statusController
) {
  // eslint-disable-next-line new-cap
  return express.Router().use(config.apis.v1.baseUri, express.Router()
    // ---
    // OSPREY
    // ---
    .use(ospreyMiddleware(config.apis.v1.raml, {
      disableErrorInterception: true,
      server:                   {
        limit: config.apis.v1.jsonMaxSize
      }
    }))

    // ---
    // GENERAL
    // ---
    .use(initContext)

    // ---
    // ROUTES
    // ---

    // Status endpoint
    .get('/status/ping', statusController.ping)

    .post('/auth/login', authController.login)

    // TODO paginate pls
    .get(   '/teams',         teamsController.getAll)
    .post(  '/teams',         teamsController.create)
    .get(   '/teams/:teamId', teamsController.get)
    .put(   '/teams/:teamId', teamsController.edit)
    .delete('/teams/:teamId', teamsController.del)

    .get(   '/users',         usersController.getAll)
    .post(  '/users',         usersController.create)
    .get(   '/users/:userId', usersController.get)
    .put(   '/users/:userId', usersController.edit)
    .delete('/users/:userId', usersController.del)

    .get(   '/users/:userId/leagues',           leaguesController.getLeaguesForUser)
    .post(  '/users/:userId/leagues/:leagueId', leaguesController.addUserToLeague)
    .delete('/users/:userId/leagues/:leagueId', leaguesController.removeUserFromLeague)

    .get(   '/users/:userId/bets',        betsController.getAll)
    .post(  '/users/:userId/bets',        betsController.create)
    .get(   '/users/:userId/bets/:betId', betsController.get)
    .put(   '/users/:userId/bets/:betId', betsController.edit)
    .delete('/users/:userId/bets/:betId', betsController.del)

    .get(   '/leagues',           leaguesController.getAll)
    .post(  '/leagues',           leaguesController.create)
    .get(   '/leagues/:leagueId', leaguesController.get)
    .put(   '/leagues/:leagueId', leaguesController.edit)
    .delete('/leagues/:leagueId', leaguesController.del)

    .get(   '/leagues/:leagueId/users', usersController.getUsersInLeague)

    .get(   '/tournaments',               tournamentsController.getAll)
    .post(  '/tournaments',               tournamentsController.create)
    .get(   '/tournaments/:tournamentId', tournamentsController.get)
    .put(   '/tournaments/:tournamentId', tournamentsController.edit)
    .delete('/tournaments/:tournamentId', tournamentsController.del)

    .get(   '/tournaments/:tournamentId/stages',          stagesController.getAll)
    .post(  '/tournaments/:tournamentId/stages',          stagesController.create)
    .get(   '/tournaments/:tournamentId/stages/:stageId', stagesController.get)
    .put(   '/tournaments/:tournamentId/stages/:stageId', stagesController.edit)
    .delete('/tournaments/:tournamentId/stages/:stageId', stagesController.del)

    .get(   '/tournaments/:tournamentId/stages/:stageId/match',          matchesController.getAll)
    .post(  '/tournaments/:tournamentId/stages/:stageId/match',          matchesController.create)
    .get(   '/tournaments/:tournamentId/stages/:stageId/match/:matchId', matchesController.get)
    .put(   '/tournaments/:tournamentId/stages/:stageId/match/:matchId', matchesController.edit)
    .delete('/tournaments/:tournamentId/stages/:stageId/match/:matchId', matchesController.del)
  );
};

function initContext(req, res, next) {
  // eslint-disable-next-line no-param-reassign
  req.context = {};
  next();
}
