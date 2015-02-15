'use strict';

var User = require('../../../src/api/user/user.model');


module.exports = function () {

    var builder = this,
        firstName, lastName, email, password, provider, authorities, avatar;

    builder.withFirstName = function (newFirstName) {
        firstName = newFirstName;
        return builder;
    };

    builder.withLastName = function (newLastName) {
        lastName = newLastName;
        return builder;
    };

    builder.withEmail = function (newEmail) {
        email = newEmail;
        return builder;
    };

    builder.withPassword = function (newPassword) {
        password = newPassword;
        return builder;
    };

    builder.withProvider = function (newProvider) {
        provider = newProvider;
        return builder;
    };

    builder.withDefaultValues = function () {
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