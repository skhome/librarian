'use strict';

var config   = require('../src/config/config'),
    mongoose = require('mongoose');

beforeEach(function (done) {

    function noop () {
        // do nothing
    }

    function cleanDB () {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[ i ].remove(noop);
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.get('mongodb:dbURI'), function (error) {
            if (error) {
                throw error;
            }
            return cleanDB();
        });
    } else {
        return cleanDB();
    }
});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});

module.exports = mongoose;
