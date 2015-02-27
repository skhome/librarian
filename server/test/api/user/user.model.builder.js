'use strict';

var User = require('../../../src/api/user/user.model');


module.exports = function () {

    var builder = this,
        firstName, lastName, email, password, provider, authorities = [], avatar;

    builder.firstName = function (newFirstName) {
        firstName = newFirstName;
        return builder;
    };

    builder.lastName = function (newLastName) {
        lastName = newLastName;
        return builder;
    };

    builder.email = function (newEmail) {
        email = newEmail;
        return builder;
    };

    builder.password = function (newPassword) {
        password = newPassword;
        return builder;
    };

    builder.provider = function (newProvider) {
        provider = newProvider;
        return builder;
    };

    builder.authorities = function (newAuthorities) {
        authorities = newAuthorities;
        return builder;
    };

    builder.defaults = function () {
        firstName = 'James';
        lastName = 'Kirk';
        email = 'jimkirk@starfleet.com';
        password = 'enterprise';
        provider = 'local';
        authorities = [];
        return builder;
    };

    builder.build = function () {
        return new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            provider: provider,
            authorities: authorities,
            avatar: avatar
        });
    };

    return builder;
};
