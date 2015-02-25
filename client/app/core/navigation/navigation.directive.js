'use strict';

import template from './navigation.html!text';

class NavigationController {

    constructor () {
        this.isMobileMenuVisible = false;
    }

    toggleMobileMenu () {
        this.isMobileMenuVisible = !this.isMobileMenuVisible;
    }

}

export default function navigationDirective () {
    return {
        restrict: 'E',
        scope: {},
        template: template,
        replace: true,
        controller: NavigationController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}
