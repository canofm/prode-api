const table  = 'matches';
const fields = [
  'id',
  'local_id',
  'visitor_id',
  'stage_id',
  'date',
  'place'
];

module.exports = function matchesRepository(
  baseMapper,
  knex
) {
  return {
    get,
    getAll,
    create,
    edit,
    del
  };

  // ---

  function get(tournamentId, stageId, matchId) {
    return knex.select(fields)
      .from(table)
      .where({
        id:       matchId,
        stage_id: stageId
      })
      .limit(1)
      .then(rows => rows[0])
      .then(baseMapper.toEntity);
  }

  function getAll(tournamentId, stageId) {
    return knex.select(fields)
      .from(table)
      .where({
        stage_id: stageId
      })
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function create(match) {
    return knex(table)
      .insert(match)
      .returning('id')
      .then(cols => cols[0])
    ;
  }p

  function edit(tournamentId, stageId, match) {
    return knex(table)
      .where({
        id:       match.id,
        stage_id: stageId
      })
      .update(match)
      .return(match)
    ;
  }

  function del(tournamentId, stageId, matchId) {
    return knex(table)
      .where({
        id:       matchId,
        stage_id: stageId
      })
      .del();
  }
};
