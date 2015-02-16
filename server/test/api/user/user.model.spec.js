'use strict';

var q              = require('q'),
    User           = require('../../../src/api/user/user.model'),
    expect         = require('chai').expect,
    mongoose       = require('../../mongoose'),
    UserBuilder    = require('./user.model.builder'),
    ValidatorError = mongoose.Error.ValidatorError;


describe('user model', function () {

    describe('first name', function () {

        it('should persist', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('Paul').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.firstName).to.equal('Paul');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withFirstName('  ').build();
            user.doSave().catch(function (error) {
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
            user.doSave().then(function (savedUser) {
                expect(savedUser.lastName).to.equal('Williams');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withLastName('  ').build();
            user.doSave().catch(function (error) {
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
            user.doSave().then(function (savedUser) {
                expect(savedUser.email).to.equal('foo@domain.net');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject invalid email', function (done) {
            var user = new UserBuilder().withDefaultValues().withEmail('aa@bb').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

    describe('password', function () {

        it('should persist encrypted', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('insecure').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.password).to.not.equal('insecure');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should have at least 6 characters', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('abc').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should not hash password again', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('insecure').build();
            user.doSave().then(function (user) {
                var hashedPassword = user.password;
                user.doSave().then(function (user) {
                    expect(user.password).to.equal(hashedPassword);
                    done();
                });
            });
        });

    });

    describe('provider', function () {

        it('should persist', function (done) {
            var user = new UserBuilder().withDefaultValues().withProvider('github').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.provider).to.equal('github');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().withDefaultValues().withProvider(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().withDefaultValues().withProvider(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().withDefaultValues().withProvider('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().withDefaultValues().withProvider('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

    describe('compare password', function () {

        it('should be equal', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('password').build();
            user.doSave().then(function (user) {
                user.doComparePassword('password').then(function (result) {
                    expect(result).to.be.true;
                    done();
                });
            });
        });

        it('should not be equal', function (done) {
            var user = new UserBuilder().withDefaultValues().withPassword('password').build();
            user.doSave().then(function (user) {
                user.doComparePassword('somethingelse').then(function (result) {
                    expect(result).to.be.false;
                    done();
                });
            });
        });

    });

    describe('find all', function () {

        beforeEach(function (done) {
            var userOne = new UserBuilder().withDefaultValues().withEmail('aa@server.com').build();
            var userTwo = new UserBuilder().withDefaultValues().withEmail('bb@server.com').build();
            q.all([ userOne.doSave(), userTwo.doSave() ]).then(function () {
                done();
            }).catch(done);
        });

        it('should return all stored users', function (done) {
            User.findAll().then(function (users) {
                expect(users).to.be.an('array');
                expect(users).to.have.length(2);
                done();
            }).catch(done);
        });
    });

});
