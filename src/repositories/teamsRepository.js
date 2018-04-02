const table  = 'teams';
const fields = [
  'id',
  'name'
];

module.exports = function teamsRepository(
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

  function get(teamId) {
    return knex.select(fields)
      .from(table)
      .where({
        id: teamId
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

  function create(team) {
    return knex(table)
      .insert(team)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(team) {
    return knex(table)
      .where('id', team.id)
      .update(team)
      .return(team)
    ;
  }

  function del(teamId) {
    return knex(table)
      .where('id', teamId)
      .del();
  }
};
