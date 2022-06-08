const supertest = require('supertest');
const {app, server} = require('../index');
const mongoose = require('mongoose');

const api = supertest(app);

test('registro de usuarios retorna el nombre del usuario', async () => {
    await api 
            .post('/api/v1/auth/login')
            .send({
                'name': "jason",
                'pass': '1234'
              })
            .expect({data:{name:"jason", level: 0}})
            .expect(200)
            .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close();
    server.close();
})