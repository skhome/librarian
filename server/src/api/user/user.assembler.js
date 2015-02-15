'use strict';

/**
 * module dependencies
 */
var User = require('./user.model'),
    _    = require('lodash');


module.exports = function (request) {

    var assembler = this,
        baseUrl = request.protocol + '://' + request.get('host') + request.originalUrl;

    assembler.toResource = function (user) {
        return {
            links: {
                self: baseUrl + '/' + user.id
            },
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    };

    assembler.toResources = function (users) {
        var resources = {
                links: {
                    self: baseUrl
                },
                content: []
            };

        _.forEach(users, function (user) {
            resources.content.push(assembler.toResource(user));
        });

        return resources;
    };

    assembler.toEntity = function (resource) {
        return new User({
            firstName: resource.firstName,
            lastName: resource.lastName,
            email: resource.email || '',
            password: resource.password || ''
        });
    };

};
