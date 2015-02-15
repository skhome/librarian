'use strict';

/**
 * module dependencies
 */
var q        = require('q'),
    bcrypt   = require('bcryptjs'),
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var SALT_WORK_FACTOR = 10;

/**
 * validation of local strategy password
 */
var validateLocalStrategyPassword = function (password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

var UserSchema     = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        match: [ /.+@.+\..+/, 'Please fill in a valid email address.' ]
    },
    password: {
        type: String,
        required: true,
        validate: [ validateLocalStrategyPassword, 'Password should be longer.' ]
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    authorities: {
        type: Array
    },
    avatar: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    facebook: {},
    twitter: {},
    github: {},
    google: {}
});

/**
 * public profile information
 */
UserSchema
    .virtual('profile')
    .get(function () {
             return {
                 'firstName': this.firstName,
                 'role': this.role
             };
         });

/**
 * encrypt the password
 */
UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // generate a hash for the changed password
    bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) {
            return next(error);
        }

        // hash the password using the new salt
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }

            // override clear-text password with hashed one
            user.password = hash;
            next();
        });
    });
});


/**
 * custom instance methods
 */
UserSchema.methods = {

    /**
     * Stores a new user in the database.
     *
     * @returns {Object} promise
     */
    create: function () {
        var deferred = q.defer();
        this.save(function (error, user) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    },

    /**
     * Check if the passwords are the same
     *
     * @param {String} password
     *
     * @returns {Object} promise
     */
    comparePassword: function (password) {
        var deferred = q.defer();
        bcrypt.compare(password, this.password, function (error, isMatch) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(isMatch);
            }
        });
        return deferred.promise;
    }
};

/**
 * custom static methods
 */
UserSchema.statics = {

    /**
     * Returns all users from the database.
     *
     * @returns {Promise}
     */
    findAll: function () {
        return this.findQ();
    }
};

module.exports = mongoose.model('User', UserSchema);
