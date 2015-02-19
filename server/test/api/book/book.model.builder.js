'use strict';

var Book = require('../../../src/api/book/book.model');

module.exports = function () {

    var builder = this,
        title;

    builder.title = function (newTitle) {
        title = newTitle;
        return builder;
    };

    builder.defaults = function () {
        title = 'Dune';
        return builder;
    };

    builder.build = function () {
        return new Book({
            title: title
        });
    };

};
