'use strict';

// vendor modules
import './vendor';

// core modules
import coreModule from './core/core';

// components
import bookModule from './components/book/book.module';

export default angular.module('app', ['ngAnimate', 'ui.router', 'restangular', coreModule.name, bookModule.name]);
