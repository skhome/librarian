'use strict';

var mongoose       = require('../../mongoose'),
    ValidatorError = mongoose.Error.ValidatorError,
    UserBuilder    = require('./user.model.builder'),
    expect         = require('chai').expect;

describe('user model', function () {

    describe('first name', function () {

        it('should persist', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('Paul').build();
            user.create().then(function (savedUser) {
                expect(savedUser.firstName).to.equal('Paul');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName(undefined).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName(null).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('  ').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

    describe('last name', function () {

        it('should persist', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName('Williams').build();
            user.create().then(function (savedUser) {
                expect(savedUser.lastName).to.equal('Williams');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName(undefined).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName(null).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName('').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName('  ').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

    describe('email', function () {

        it('should persist', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('foo@domain.net').build();
            user.create().then(function (savedUser) {
                expect(savedUser.email).to.equal('foo@domain.net');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail(undefined).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail(null).build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('  ').build();
            user.create().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

});
