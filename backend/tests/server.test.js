const request = require('supertest');
const { app, server } = require('../server/server');

afterAll((done) => {
  server.close(done);
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Welcome to SanjhiAI Backend API');
  });
});
