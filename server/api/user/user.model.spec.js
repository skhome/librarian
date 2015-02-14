/*global describe, it */
/*jshint expr: true */
'use strict';

var User   = require('./user.model'),
    expect = require('chai').expect;

describe('user model', function () {

    describe('first name', function () {

        it('should exist', function () {
            expect(User.schema.path('firstName')).to.exist;
        });

        it('should be mandatory', function () {
            expect(User.schema.path('firstName')).to.exist;
        });
    });


});
