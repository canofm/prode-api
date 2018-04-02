const table  = 'leagues';
const fields = [
  'id',
  'name'
];

module.exports = function leaguesRepository(
  baseMapper,
  knex
) {
  return {
    get,
    getAll,
    getByIds,
    create,
    edit,
    del
  };

  // ---

  function get(leagueId) {
    return knex.select(fields)
      .from(table)
      .where({
        id: leagueId
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

  function getByIds(ids) {
    return knex.select(fields)
      .from(table)
      .whereIn('id', ids)
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function create(league) {
    return knex(table)
      .insert(league)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(league) {
    return knex(table)
      .where('id', league.id)
      .update(league)
      .return(league)
    ;
  }

  function del(leagueId) {
    return knex(table)
      .where('id', leagueId)
      .del();
  }
};
