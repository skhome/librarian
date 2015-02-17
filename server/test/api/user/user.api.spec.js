'use strict';

var users               = require('../../../src/api/user'),
    expect              = require('chai').expect,
    request             = require('supertest-as-promised'),
    express             = require('../../../src/config/express'),
    mongoose            = require('../../mongoose'),
    UserModelBuilder    = require('./user.model.builder'),
    UserResourceBuilder = require('./user.resource.builder.js'),
    app                 = express();


describe('API', function () {

    before(function () {
        users(app);
    });

    describe('POST /api/users', function () {

        it('should respond with 201 CREATED', function (done) {
            var resource = new UserResourceBuilder().defaults().build();
            request(app)
                .post('/api/users')
                .send(resource)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect(201, done);
        });

        it('should respond with Location header', function (done) {
            var resource = new UserResourceBuilder().defaults().build();
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
            var resource = new UserResourceBuilder().defaults().build();
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
            var resource = new UserResourceBuilder().defaults().build();
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
            var resource = new UserResourceBuilder().defaults().password('').build();
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

    describe('GET /api/users', function () {

        it('should respond with 200 OK', function (done) {
            request(app)
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect(200, done);
        });

        it('should include list of users', function (done) {
            var user = new UserModelBuilder().defaults().build();
            user.doSave()
                .then(function () {
                          return request(app)
                              .get('/api/users')
                              .set('Accept', 'application/json');
                      })
                .then(function (response) {
                          var resource = response.body;
                          expect(resource.content).to.be.an('array');
                          expect(resource.content).to.have.length(1);
                          expect(resource.content[ 0 ].firstName).to.equal(user.firstName);
                          expect(resource.content[ 0 ].lastName).to.equal(user.lastName);
                          expect(resource.content[ 0 ].email).to.equal(user.email);
                          done();
                      })
                .catch(done);
        });

        it('should include self links', function (done) {
            var user = new UserModelBuilder().defaults().build();
            user.doSave()
                .then(function () {
                          return request(app)
                              .get('/api/users')
                              .set('Accept', 'application/json');
                      })
                .then(function (response) {
                          var resource = response.body;
                          expect(resource.links).to.exist;
                          expect(resource.links.self).to.match(/api\/users/);
                          expect(resource.content[ 0 ].links).to.exist;
                          expect(resource.content[ 0 ].links.self).to.match(/api\/users\/\w{20,}$/);
                          done();
                      })
                .catch(done);
        });

        // TODO find a way to test this
        it('should respond with 500 for server error');
    });

});

