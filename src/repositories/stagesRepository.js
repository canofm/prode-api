const table  = 'stages';
const fields = [
  'id',
  'tournament_id',
  'name'
];

module.exports = function stagesRepository(
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

  function get(tournamentId, stageId) {
    return knex.select(fields)
      .from(table)
      .where({
        id:            stageId,
        tournament_id: tournamentId
      })
      .limit(1)
      .then(rows => rows[0])
      .then(baseMapper.toEntity);
  }

  function getAll(tournamentId) {
    return knex.select(fields)
      .from(table)
      .where({
        tournament_id: tournamentId
      })
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function create(stage) {
    return knex(table)
      .insert(stage)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(tournamentId, stage) {
    return knex(table)
      .where({
        id:            stage.id,
        tournament_id: tournamentId
      })
      .update(stage)
      .return(stage)
    ;
  }

  function del(tournamentId, stageId) {
    return knex(table)
      .where({
        id:            stage,
        tournament_id: tournamentId
      })
      .del();
  }
};
