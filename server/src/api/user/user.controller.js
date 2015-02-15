'use strict';

/**
 * module dependencies
 */
var User          = require('./user.model'),
    logger        = require('mm-node-logger')(module),
    UserAssembler = require('./user.assembler');


/**
 * Create a new user account.
 *
 * @param {Object} request the request object
 * @param {Object} response the response object
 */
exports.create    = function (request, response) {

    var assembler = new UserAssembler(request),
        user      = assembler.toEntity(request.body);

    user.provider = 'local';
    user.authorities = [ 'USER' ];

    user.create()
        .then(function (user) {
            var resource = assembler.toResource(user);
            response.status(201).location(resource.links.self).json(resource);
        })
        .catch(function (error) {
            if (error.name === 'ValidationError') {
                logger.info(error);
                response.status(400);
            } else {
                logger.error(error);
                response.status(500);
            }
            response.json(error);
        })
        .done();
};

/**
 * List all user accounts.
 *
 * @param {Object} request the request object
 * @param {Object} response the response object
 */
exports.findAll   = function (request, response) {

    var assembler = new UserAssembler(request);

    User.findAll()
        .then(function (users) {
            response.json(assembler.toResources(users));
        })
        .catch(function (error) {
            logger.error(error);
            response.status(500).json(error);
        });
};
