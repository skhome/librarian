'use strict';

/**
 * module dependencies
 */
var q        = require('q'),
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
});

/**
 * custom instance methods
 */
BookSchema.methods = {

    /**
     * Stores a new user in the database.
     *
     * @returns {Object} promise
     */
    doSave: function () {
        var deferred = q.defer();
        this.save(function (error, user) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};

module.exports = mongoose.model('Book', BookSchema);
