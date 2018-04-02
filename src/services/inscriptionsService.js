const bluebird = require('bluebird');

module.exports = function inscriptionsService(
  container,
  inscriptionsRepository
) {
  return {
    getInscriptionsForUser,
    getUsersInLeague,
    enrollUser,
    unenrollUser
  };

  // ---

  function getInscriptionsForUser(userId) {
    return inscriptionsRepository.getInscriptionsForUser(userId)
      .map(inscriptions => inscriptions.leagueId)
      .then(leagueIds => container.get('leaguesService').getByIds(leagueIds));
  }

  function getUsersInLeague(leagueId) {
    return inscriptionsRepository.getUsersInLeague(leagueId)
      .map(inscriptions => inscriptions.userId)
      .then(userIds => container.get('usersService').getByIds(userIds));
  }

  function enrollUser(userId, leagueId) {
    const enrollment = {userId, leagueId};

    return inscriptionsRepository.enrollUser(enrollment);
  }

  function unenrollUser(userId, leagueId) {
    return inscriptionsRepository.unenrollUser(userId, leagueId);
  }
};
