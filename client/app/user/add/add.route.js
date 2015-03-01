'use strict';

import template from './add.html!text';

import UserAddController from './add.controller';

/**
 * Defines the state for adding a user account.
 *
 * @param $stateProvider
 *
 * @ngInject
 */
function userAddRoute ($stateProvider) {
    'ngInject';

    $stateProvider.state('users.add', {
        url: '/add',
        onEnter: function ($stateParams, $state, $modal) {
            $modal.open({
                template: template,
                controller: UserAddController,
                controllerAs: 'vm',
                size: 'lg'
            }).result.finally(function () {
                                  $state.go('users');
                              });
        }
    });

}

export default userAddRoute;
