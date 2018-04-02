module.exports = function baseMapper() {
  const pairs = [{
    rowName: 'user_id',
    entName: 'userId'
  }, {
    rowName: 'league_id',
    entName: 'leagueId'
  }, {
    rowName: 'match_id',
    entName: 'matchId'
  }, {
    rowName: 'tournament_id',
    entName: 'tournamentId'
  }, {
    rowName: 'stage_id',
    entName: 'stageId'
  }, {
    rowName: 'local_id',
    entName: 'localId'
  }, {
    rowName: 'visitor_id',
    entName: 'visitorId'
  }, {
    rowName: 'local_score',
    entName: 'localScore'
  }, {
    rowName: 'visitor_score',
    entName: 'visitorScore'
  }];

  return {
    toEntity,
    toRow
  };

  // ---

  function toEntity(row) {
    let value;

    pairs.forEach(pair => {
      if (row[pair.rowName]) {
        value             = row[pair.rowName];
        delete row[pair.rowName];
        row[pair.entName] = value;
      }
    });

    return row;
  }

  function toRow(entity) {
    let value;

    pairs.forEach(pair => {
      value                = entity[pair.entName];
      delete entity[pair.entName];
      entity[pair.rowName] = value;
    });

    return entity;
  }
};
