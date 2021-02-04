const request  = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

const user1 = { email: 'user1@user1.com', username: 'user1', password: 'pineapple'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

test('Sanity Check:', () => {
  expect(true).toBe(true);
});

describe('endpoints', () => {
  describe('[POST] /api/register', () => {
    it('responds with 400 if no credentials', () => {
      return request(server).post('/api/register')
        .send({})
        .then(res => {
          expect(res.status).toBe(400)
        })
    })
  })  

  describe('[POST] /api/login', () => {
    it('responds with a token when logging in', async() => {
      await request(server).post('/api/register').send(user1)
      const res = await request(server).post('/api/login').send(user1)
      expect(res.body).toHaveProperty('token')
    })
  })  
})