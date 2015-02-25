'use strict';

import template from './list.html!text';

/**
 * Defines the route for managing users.
 *
 * @param $stateProvider router state provider
 *
 * @ngInject
 */
function userListRoute ($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/users',
            template: template,
            controller: 'UserListController as vm',
            resolve: {
                users: UserResource => UserResource.findAll()
            }
        });
}

export default userListRoute;
