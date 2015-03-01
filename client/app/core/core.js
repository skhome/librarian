'use strict';

import onConfig from './config/config';

import navigationDirective from './navigation/navigation.directive';

import coreTestModule from './config/config.test';

export default angular.module('app.core', [ coreTestModule.name ])
    .config(onConfig)
    .directive('libNavbar', navigationDirective);
