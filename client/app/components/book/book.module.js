'use strict';

import angular from 'angular';

import BookResource from './book.resource';
import configureBookResourceMock from './book.resource.mock';

import bookShelfModule from '../book/shelf/book-shelf.module';

export default angular.module('app.book', [ bookShelfModule.name ])
    .service('BookResource', BookResource)
    .run(configureBookResourceMock);
