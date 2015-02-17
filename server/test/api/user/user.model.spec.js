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
            var user = new UserBuilder().defaults().firstName('Paul').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.firstName).to.equal('Paul');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().defaults().firstName(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().defaults().firstName(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().defaults().firstName('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.firstName).to.exist;
                expect(error.errors.firstName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().defaults().firstName('  ').build();
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
            var user = new UserBuilder().defaults().lastName('Williams').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.lastName).to.equal('Williams');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().defaults().lastName(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().defaults().lastName(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().defaults().lastName('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.lastName).to.exist;
                expect(error.errors.lastName).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().defaults().lastName('  ').build();
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
            var user = new UserBuilder().defaults().email('foo@domain.net').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.email).to.equal('foo@domain.net');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().defaults().email(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().defaults().email(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().defaults().email('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().defaults().email('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.email).to.exist;
                expect(error.errors.email).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject invalid email', function (done) {
            var user = new UserBuilder().defaults().email('aa@bb').build();
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
            var user = new UserBuilder().defaults().password('insecure').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.password).to.not.equal('insecure');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().defaults().password(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().defaults().password(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().defaults().password('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().defaults().password('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should have at least 6 characters', function (done) {
            var user = new UserBuilder().defaults().password('abc').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.password).to.exist;
                expect(error.errors.password).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should not hash password again', function (done) {
            var user = new UserBuilder().defaults().password('insecure').build();
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
            var user = new UserBuilder().defaults().provider('github').build();
            user.doSave().then(function (savedUser) {
                expect(savedUser.provider).to.equal('github');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new UserBuilder().defaults().provider(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new UserBuilder().defaults().provider(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new UserBuilder().defaults().provider('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.provider).to.exist;
                expect(error.errors.provider).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new UserBuilder().defaults().provider('  ').build();
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
            var user = new UserBuilder().defaults().password('password').build();
            user.doSave().then(function (user) {
                user.doComparePassword('password').then(function (result) {
                    expect(result).to.be.true;
                    done();
                });
            });
        });

        it('should not be equal', function (done) {
            var user = new UserBuilder().defaults().password('password').build();
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
            var userOne = new UserBuilder().defaults().email('aa@server.com').build();
            var userTwo = new UserBuilder().defaults().email('bb@server.com').build();
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
