const table  = 'users';
const fields = [
  'id',
  'username'
];

module.exports = function usersRepository(
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

  function get(userId) {
    return knex.select(fields)
      .from(table)
      .where({
        id: userId
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

  function create(user) {
    return knex(table)
      .insert(user)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(user) {
    return knex(table)
      .where('id', user.id)
      .update(user)
      .return(user)
    ;
  }

  function del(userId) {
    return knex(table)
      .where('id', userId)
      .del();
  }
};
