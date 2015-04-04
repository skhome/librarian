'use strict';

import angular from 'angular';

import configureBookShelfRoutes from './book-shelf.route';
import BookShelfController from './book-shelf.controller';

export default angular.module('app.book.shelf', [])
    .config(configureBookShelfRoutes)
    .controller('BookShelfController', BookShelfController);
