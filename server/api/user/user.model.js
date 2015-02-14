'use strict';

/**
 * module dependencies
 */
var q        = require('q'),
    bcrypt   = require('bcryptjs'),
    mongoose = require('mongoose-q')(),
    Schema   = mongoose.Schema;

var SALT_WORK_FACTOR = 10,
    authTypes        = [ 'github', 'twitter', 'facebook', 'google' ];

/**
 * validation of local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};
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
        required: true,
        validate: [ validateLocalStrategyProperty, 'Please fill in your first name.' ]
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        validate: [ validateLocalStrategyProperty, 'Please fill in your last name.' ]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [ validateLocalStrategyProperty, 'Please fill in your email.' ],
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
 * validate email, if you are not authenticated by any of the OAuth strategies.
 */
UserSchema
    .path('email')
    .validate(function (email) {
                  if (authTypes.indexOf(this.provider) !== -1) {
                      return true;
                  }
                  return email.length;
              }, 'Email cannot be blank');

/**
 * validate that email is unique
 */
UserSchema
    .path('email')
    .validate(function (value, respond) {
                  var self = this;
                  this.constructor.findOne({ email: value }, function (error, user) {
                      if (error) {
                          throw error;
                      }

                      if (user) {
                          if (self.id === user.id) {
                              return respond(true);
                          }
                          return respond(false);
                      }
                      respond(true);
                  });
              }, 'The specified email address is already in use.');

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
     */
    create: function () {
        return this.saveQ();
    },

    /**
     * Check if the passwords are the same
     *
     * @param {String} password
     *
     * @returns {Promise}
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
