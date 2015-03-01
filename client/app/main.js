'use strict';

// vendor modules
import './vendor';

// core modules
import coreModule from './core/core';

// application modules
import userModule from './user/user.module';

let mainModule = angular.module('app', [

    // angular modules
    'ngAnimate',
    'ngMessages',

    'ui.router',
    'ui.bootstrap',
    'restangular',

    // core modules
    coreModule.name,

    // state modules
    userModule.name

]);

export default mainModule;
