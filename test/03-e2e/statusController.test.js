const bluebird  = require('bluebird');
const supertest = require('supertest');
const containerFactory = require('../support/testContainerFactory');

// ---

const container = containerFactory.createContainer();

// ---

describe('statusController', container.describe(() => {
  let request;

  beforeEach(function beforeEach() {
    this.container.resolve(function (app) {
      request = supertest(app);
    });
  });

  describe('GET /api/v1/status/echo', () => {
    it('should respond with correct status and body', () => (
      bluebird.fromNode((callback) => {
        request.get('/api/v1/status/echo')
          .send()
          .expect(200, { status: 'ok' })
          .end(callback)
        ;
      })
    ));
  });
}));
