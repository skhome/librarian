'use strict';

var sinon = require('sinon');

module.exports = function UserResourceBuilder () {

    var builder = this,
        firstName, lastName, email, password, avatar;

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

    builder.avatar = function (newAvatar) {
        avatar = newAvatar;
        return builder;
    };

    builder.defaults = function () {
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
