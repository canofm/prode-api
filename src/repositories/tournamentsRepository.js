const table  = 'tournaments';
const fields = [
  'id',
  'name'
];

module.exports = function tournamentsRepository(
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

  function get(tournamentId) {
    return knex.select(fields)
      .from(table)
      .where({
        id: tournamentId
      })
      .limit(1)
      .then(rows => rows[0])
      .then(baseMapper.toEntity);
  }

  function getAll() {
    return knex.select(fields)
      .from(table)
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function create(tournament) {
    return knex(table)
      .insert(tournament)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(tournament) {
    return knex(table)
      .where('id', tournament.id)
      .update(tournament)
      .return(tournament)
    ;
  }

  function del(tournamentId) {
    return knex(table)
      .where('id', tournamentId)
      .del();
  }
};
