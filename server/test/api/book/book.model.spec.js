'use strict';

var expect           = require('chai').expect,
    BookModelBuilder = require('./book.model.builder'),
    mongoose         = require('../../mongoose'),
    ValidatorError   = mongoose.Error.ValidatorError;

describe('book model', function () {

    describe('title', function () {

        it('should persist', function (done) {
            var book = new BookModelBuilder().defaults().title('Dune').build();
            book.doSave().then(function (savedBook) {
                expect(savedBook.title).to.equal('Dune');
                done();
            }).catch(done);
        });

        it('should reject undefined', function (done) {
            var user = new BookModelBuilder().defaults().title(undefined).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.title).to.exist;
                expect(error.errors.title).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject null', function (done) {
            var user = new BookModelBuilder().defaults().title(null).build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.title).to.exist;
                expect(error.errors.title).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject empty', function (done) {
            var user = new BookModelBuilder().defaults().title('').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.title).to.exist;
                expect(error.errors.title).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

        it('should reject blank', function (done) {
            var user = new BookModelBuilder().defaults().title('  ').build();
            user.doSave().catch(function (error) {
                expect(error.name).to.equal('ValidationError');
                expect(error.errors.title).to.exist;
                expect(error.errors.title).to.be.an.instanceof(ValidatorError);
                done();
            });
        });

    });

});
