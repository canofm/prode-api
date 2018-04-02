"use strict";

const bluebird = require('bluebird');

exports.up = function(knex, Promise) {
  return Promise.resolve()
    .then(createTeamsTable)
    .then(createUsersTable)
    .then(createLeaguesTable)
    .then(createInscriptionsTable)
    .then(createTournamentsTable)
    .then(createStagesTable)
    .then(createMatchesTable)
    .then(createBetsTable)

    .then(insertTeams)
    .then(insertUsers)
    .then(insertLeagues)
    .then(insertInscriptions)
    .then(insertTournaments)
    .then(insertStages)
    .then(insertMatches)
    .then(insertBets)
  ;

  // ---
  // CREATES
  // ---

  function createTeamsTable() {
    return knex.schema.createTable('teams', function(table) {
      table.increments('id').primary().unsigned();
      table.string('name');
    });
  }

  function createUsersTable() {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary().unsigned();
      table.string('username').unique();
      table.timestamps();
    });
  }

  function createLeaguesTable() {
    return knex.schema.createTable('leagues', function(table) {
      table.increments('id').primary().unsigned();
      table.string('name');
    })
  }

  function createInscriptionsTable() {
    return knex.schema.createTable('inscriptions', function(table) {
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('league_id').unsigned().references('id').inTable('leagues');
      table.timestamps();
      table.unique(['user_id', 'league_id']);
    })
  }

  function createTournamentsTable() {
    return knex.schema.createTable('tournaments', function(table) {
      table.increments('id').primary().unsigned();
      table.string('name');
    })
  }

  function createStagesTable() {
    return knex.schema.createTable('stages', function(table) {
      table.increments('id').primary().unsigned();
      table.integer('tournament_id').unsigned().references('id').inTable('tournaments');
      table.string('name');
    })
  }

  function createMatchesTable() {
    return knex.schema.createTable('matches', function(table) {
      table.increments('id').primary().unsigned();
      table.integer('local_id').unsigned().references('id').inTable('teams');
      table.integer('visitor_id').unsigned().references('id').inTable('teams');
      table.integer('stage_id').unsigned().references('id').inTable('stages');
      table.dateTime('date');
      table.string('place');
    })
  }

  function createBetsTable() {
    return knex.schema.createTable('bets', function(table) {
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('match_id').unsigned().references('id').inTable('matches');
      table.integer('local_score');
      table.integer('visitor_score');
      table.timestamps();
      table.unique(['user_id', 'match_id']);
    })
  }

  // ---
  // INSERTS
  // ---

  function insertTeams() {
    const teams = [
      'Rusia',
      'Brasil',
      'Irán',
      'Japón',
      'México',
      'Bélgica',
      'Corea del Sur',
      'Arabia Saudita',
      'Alemania',
      'Inglaterra',
      'España',
      'Nigeria',
      'Costa Rica',
      'Polonia',
      'Egipto',
      'Islandia',
      'Serbia',
      'Francia',
      'Portugal',
      'Uruguay',
      'Argentina',
      'Colombia',
      'Panamá',
      'Senegal',
      'Marruecos',
      'Túnez',
      'Suiza',
      'Croacia',
      'Suecia',
      'Dinamarca',
      'Australia',
      'Perú'
    ].map(name => ({name}));

    return bluebird.map(teams, team => knex('teams').insert(team));
  }

  function insertUsers() {
    const users = [
      'user1',
      'user2',
      'user3'
    ].map(username => ({username}));

    return bluebird.map(users, user => knex('users').insert(user));
  }

  function insertLeagues() {
    const leagues = [
      'Liga default'
    ].map(name => ({name}));

    return bluebird.map(leagues, league => knex('leagues').insert(league));
  }

  //   return knex.schema.createTable('inscriptions', function(table) {
  //     table.increments('id').primary().unsigned();
  //     table.integer('user_id').unsigned().references('id').inTable('users');
  //     table.integer('league_id').unsigned().references('id').inTable('leagues');
  //     table.timestamps();
  //     table.unique(['user_id', 'league_id']);
  function insertInscriptions() {
    const inscriptions = [{
      user_id:   1,
      league_id: 1
    }, {
      user_id:   2,
      league_id: 1
    }, {
      user_id:   3,
      league_id: 1
    }];

    return bluebird.map(inscriptions, inscription => knex('inscriptions').insert(inscription));
  }

  function insertTournaments() {
    const tournaments = [
      'Mundial 2018'
    ].map(name => ({name}));

    return bluebird.map(tournaments, tournament => knex('tournaments').insert(tournament));
  }

  function insertStages() {
    const stages = [
      'Grupo A',
      'Grupo B',
      'Grupo C',
      'Grupo D',
      'Grupo E',
      'Grupo F',
      'Grupo G',
      'Grupo H'
    ].map(name => ({
      name,
      tournament_id: 1
    }));

    return bluebird.map(stages, stage => knex('stages').insert(stage));
  }

  function insertMatches() {
    const matches = [{
      local_id:   1,
      visitor_id: 2,
      stage_id:   1,
      date:       new Date(),
      place:      'cancha 1'
    }, {
      local_id:   3,
      visitor_id: 4,
      stage_id:   1,
      date:       new Date(),
      place:      'cancha 2'
    }, {
      local_id:   5,
      visitor_id: 6,
      stage_id:   2,
      date:       new Date(),
      place:      'cancha 3'
    }, {
      local_id:   7,
      visitor_id: 8,
      stage_id:   2,
      date:       new Date(),
      place:      'cancha 4'
    }];

    return bluebird.map(matches, match => knex('matches').insert(match));
  }

  function insertBets() {
    const bets = [{
      user_id:       1,
      match_id:      1,
      local_score:   3,
      visitor_score: 0
    }, {
      user_id:       1,
      match_id:      2,
      local_score:   1,
      visitor_score: 2
    }, {
      user_id:       1,
      match_id:      3,
      local_score:   0,
      visitor_score: 0
    }, {
      user_id:       2,
      match_id:      1,
      local_score:   2,
      visitor_score: 5
    }];

    return bluebird.map(bets, bet => knex('bets').insert(bet));
  }
};

exports.down = function(knex, Promise) {
  const tables = [
    'inscriptions',
    'bets',
    'users',
    'leagues',
    'matches',
    'teams',
    'stages',
    'tournaments'
  ];

  return bluebird.map(tables, table => knex.schema.dropTable(table));
};
