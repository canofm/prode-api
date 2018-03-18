const express = require('express');
const ospreyMiddleware = require('osprey-middleware');

module.exports = function apiV1Router(
  config,

  apuestasController,
  authController,
  equiposController,
  etapasController,
  ligasController,
  partidosController,
  torneosController,
  usuariosController,

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
    .get(   '/equipos',           equiposController.obtenerTodos)
    .post(  '/equipos',           equiposController.crear)
    .get(   '/equipos/:equipoId', equiposController.obtenerUno)
    .put(   '/equipos/:equipoId', equiposController.editar)
    .delete('/equipos/:equipoId', equiposController.eliminar)

    .get(   '/usuarios',            usuariosController.obtenerTodos)
    .post(  '/usuarios',            usuariosController.crear)
    .get(   '/usuarios/:usuarioId', usuariosController.obtenerUno)
    .put(   '/usuarios/:usuarioId', usuariosController.editar)
    .delete('/usuarios/:usuarioId', usuariosController.eliminar)

    .get(   '/usuarios/:usuarioId/ligas',         ligasController.obtenerTodos)
    .post(  '/usuarios/:usuarioId/ligas',         ligasController.crear)
    .delete('/usuarios/:usuarioId/ligas/:ligaId', ligasController.eliminar)

    .get(   '/usuarios/:usuarioId/apuestas',            apuestasController.obtenerTodos)
    .post(  '/usuarios/:usuarioId/apuestas',            apuestasController.crear)
    .get(   '/usuarios/:usuarioId/apuestas/:apuestaId', apuestasController.obtenerUno)
    .put(   '/usuarios/:usuarioId/apuestas/:apuestaId', apuestasController.editar)
    .delete('/usuarios/:usuarioId/apuestas/:apuestaId', apuestasController.eliminar)

    .get(   '/ligas',         ligasController.obtenerTodos)
    .post(  '/ligas',         ligasController.crear)
    .get(   '/ligas/:ligaId', ligasController.obtenerUno)
    .put(   '/ligas/:ligaId', ligasController.editar)
    .delete('/ligas/:ligaId', ligasController.eliminar)

    .get(   '/ligas/:ligaId/usuarios', usuariosController.obtenerTodosPorLiga)
    .delete('/ligas/:ligaId/usuarios', usuariosController.obtenerUnoByBranch)

    .get(   '/torneos',           torneosController.obtenerTodos)
    .post(  '/torneos',           torneosController.crear)
    .get(   '/torneos/:torneoId', torneosController.obtenerUno)
    .put(   '/torneos/:torneoId', torneosController.editar)
    .delete('/torneos/:torneoId', torneosController.eliminar)

    .get(   '/torneos/:torneoId/etapas',          etapasController.obtenerTodos)
    .post(  '/torneos/:torneoId/etapas',          etapasController.crear)
    .get(   '/torneos/:torneoId/etapas/:etapaId', etapasController.obtenerUno)
    .put(   '/torneos/:torneoId/etapas/:etapaId', etapasController.editar)
    .delete('/torneos/:torneoId/etapas/:etapaId', etapasController.eliminar)

    .get(   '/torneos/:torneoId/etapas/:etapaId/partido',            partidosController.obtenerTodos)
    .post(  '/torneos/:torneoId/etapas/:etapaId/partido',            partidosController.crear)
    .get(   '/torneos/:torneoId/etapas/:etapaId/partido/:partidoId', partidosController.obtenerUno)
    .put(   '/torneos/:torneoId/etapas/:etapaId/partido/:partidoId', partidosController.editar)
    .delete('/torneos/:torneoId/etapas/:etapaId/partido/:partidoId', partidosController.eliminar)
  );
};

function initContext(req, res, next) {
  // eslint-disable-next-line no-param-reassign
  req.context = {};
  next();
}
