'use strict';

var sinon = require('sinon');

module.exports = function () {

    var builder = this,
        firstName, lastName, email, password, avatar;

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

    builder.withAvatar = function (newAvatar) {
        avatar = newAvatar;
        return builder;
    };

    builder.withDefaultValues = function () {
        firstName = 'James';
        lastName = 'Kirk';
        email = 'jimkirk@starfleet.com';
        password = 'enterprise';
        avatar = 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
        return builder;
    };

    builder.build = function () {
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            avatar: avatar
        };
    };

    return builder;
};
