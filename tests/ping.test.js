require('babel-register')
const app = require('../app/app')
const request = require('supertest')

app.listen()

test('200 ok', done => {
  request(app)
    .get('/ping')
    .expect('Content-Type', '/json/')
    .expect(200, { a: 'ok' }, done)
})
