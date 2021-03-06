'use strict';

var chai        = require('chai'),
    sinon       = require('sinon'),
    expect      = chai.expect,
    sinonChai   = require('sinon-chai'),
    Assembler   = require('../../../src/api/user/user.assembler'),
    UserBuilder = require('./user.model.builder');

chai.use(sinonChai);

describe('user assembler', function () {

    describe('resource', function () {

        var assembler;

        before(function () {
            var request = {
                protocol: 'http',
                get: sinon.stub(),
                originalUrl: '/api/users'
            };
            request.get.withArgs('host').returns('localhost');
            assembler = new Assembler(request);
        });

        it('should contain first name', function () {
            var user = new UserBuilder().defaults().firstName('Paul').build();
            var resource = assembler.toResource(user);
            expect(resource.firstName).to.equal('Paul');
        });

        it('should contain last name', function () {
            var user = new UserBuilder().defaults().lastName('Williams').build();
            var resource = assembler.toResource(user);
            expect(resource.lastName).to.equal('Williams');
        });

        it('should contain email', function () {
            var user = new UserBuilder().defaults().email('paul@atreides.com').build();
            var resource = assembler.toResource(user);
            expect(resource.email).to.equal('paul@atreides.com');
        });

        it('should contain provider', function () {
            var user = new UserBuilder().defaults().provider('local').build();
            var resource = assembler.toResource(user);
            expect(resource.provider).to.equal('local');
        });

        it('should contain authorities', function () {
            var user = new UserBuilder().defaults().authorities([ 'USER' ]).build();
            var resource = assembler.toResource(user);
            expect(resource.authorities).to.contain('USER');
        });

        it('should contain self link', function () {
            var user = new UserBuilder().defaults().build();
            var resource = assembler.toResource(user);
            expect(resource.links.self).to.equal('http://localhost/api/users/' + user._id);
        });
    });

    describe('collection resource', function () {

        var assembler;

        before(function () {
            var request = {
                protocol: 'http',
                get: sinon.stub(),
                originalUrl: '/api/users'
            };
            request.get.withArgs('host').returns('localhost');
            assembler = new Assembler(request);
        });

        it('should contain all converted entities', function () {
            var users = [
                new UserBuilder().defaults().build(),
                new UserBuilder().defaults().build()
            ];
            var resource = assembler.toResources(users);
            expect(resource.content).to.be.an('array');
            expect(resource.content).to.have.length(2);
        });

        it('should contain self link', function () {
            var users = [
                new UserBuilder().defaults().build(),
                new UserBuilder().defaults().build()
            ];
            var resource = assembler.toResources(users);
            expect(resource.links.self).to.equal('http://localhost/api/users');
        });
    });

    describe('entity', function () {

        var assembler;

        before(function () {
            var request = {
                protocol: 'http',
                get: sinon.stub(),
                originalUrl: '/api/users'
            };
            request.get.withArgs('host').returns('localhost');
            assembler = new Assembler(request);
        });

        it('should contain first name', function () {
            var resource = {
                firstName: 'Paul'
            };
            var user = assembler.toEntity(resource);
            expect(user.firstName).to.equal('Paul');
        });

        it('should contain last name', function () {
            var resource = {
                lastName: 'Williams'
            };
            var user = assembler.toEntity(resource);
            expect(user.lastName).to.equal('Williams');
        });

        it('should contain email', function () {
            var resource = {
                email: 'jim@domain.net'
            };
            var user = assembler.toEntity(resource);
            expect(user.email).to.equal('jim@domain.net');
        });

        it('should contain password', function () {
            var resource = {
                password: 'insecure'
            };
            var user = assembler.toEntity(resource);
            expect(user.password).to.equal('insecure');
        });
    });
});
