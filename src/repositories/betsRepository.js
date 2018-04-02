const table  = 'bets';
const fields = [
  'id',
  'user_id',
  'match_id',
  'local_score',
  'visitor_score'
];

module.exports = function betsRepository(
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

  function get(userId, betId) {
    return knex.select(fields)
      .from(table)
      .where({
        id:      betId,
        user_id: userId
      })
      .limit(1)
      .then(rows => rows[0])
      .then(baseMapper.toEntity);
  }

  function getAll(userId) {
    return knex.select(fields)
      .from(table)
      .where('user_id', userId)
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function create(bet) {
    return knex(table)
      .insert(bet)
      .returning('id')
      .then(cols => cols[0])
    ;
  }

  function edit(userId, bet) {
    return knex(table)
      .where({
        id:      bet.id,
        user_id: userId
      })
      .update(bet)
      .return(bet)
    ;
  }

  function del(userId, betId) {
    return knex(table)
      .where({
        id:      betId,
        user_id: userId
      })
      .del();
  }
};
