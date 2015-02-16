'use strict';

var users           = require('../../../src/api/user'),
    expect          = require('chai').expect,
    request         = require('supertest-as-promised'),
    express         = require('../../../src/config/express'),
    mongoose        = require('../../mongoose'),
    ResourceBuilder = require('./user.resource.builder.js'),
    app             = express();


describe('API', function () {

    describe('POST /api/users', function () {

        before(function () {
            users(app);
        });

        it('should respond with 201 CREATED', function (done) {
            var resource = new ResourceBuilder().withDefaultValues().build();
            request(app)
                .post('/api/users')
                .send(resource)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(201, done);
        });

        it('should respond with Location header', function (done) {
            var resource = new ResourceBuilder().withDefaultValues().build();
            return request(app)
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(resource)
                .expect('Location', /api\/users\/\w{20,}$/)
                .then(function () {
                          done();
                      })
                .catch(done);
        });

        it('should respond with created user', function (done) {
            var resource = new ResourceBuilder().withDefaultValues().build();
            return request(app)
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(resource)
                .then(function (response) {
                          expect(response.body.firstName).to.equal(resource.firstName);
                          expect(response.body.lastName).to.equal(resource.lastName);
                          expect(response.body.email).to.equal(resource.email);
                          done();
                      })
                .catch(done);
        });

        it('should include self link', function (done) {
            var resource = new ResourceBuilder().withDefaultValues().build();
            return request(app)
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(resource)
                .then(function (response) {
                          expect(response.body.links.self).to.match(/api\/users\/\w{20,}$/);
                          done();
                      })
                .catch(done);
        });

        it('should respond with 400 for validation error', function (done) {
            var resource = new ResourceBuilder().build();
            return request(app)
                .post('/api/users')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(resource)
                .expect(400, done);
        });

        // TODO find a way to test this
        it('should respond with 500 for server error');

    });

});

