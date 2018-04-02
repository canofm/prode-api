const table  = 'inscriptions';
const fields = [
  'id',
  'user_id',
  'league_id'
];

module.exports = function inscriptionsRepository(
  baseMapper,
  knex
) {
  return {
    getInscriptionsForUser,
    getUsersInLeague,
    enrollUser,
    unenrollUser
  };

  // ---

  function getInscriptionsForUser(userId) {
    return knex.select(fields)
      .from(table)
      .where('user_id', userId)
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function getUsersInLeague(leagueId) {
    return knex.select(fields)
      .from(table)
      .where('league_id', leagueId)
      .then(rows => rows)
      .each(baseMapper.toEntity);
  }

  function enrollUser(enrollment) {
    const row = {
      user_id:   enrollment.userId,
      league_id: enrollment.league_id
    };

    return knex(table)
      .insert(row)
      .then(rows => rows);
  }

  function unenrollUser(userId, leagueId) {
    return knex(table)
      .where({
        league_id: leagueId,
        user_id:   userId
      })
      .del();
  }
};
