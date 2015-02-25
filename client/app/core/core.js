'use strict';

import onConfig from './config/config';

import navigationDirective from './navigation/navigation.directive';

export default angular.module('app.core', [])
    .config(onConfig)
    .directive('libNavbar', navigationDirective);
