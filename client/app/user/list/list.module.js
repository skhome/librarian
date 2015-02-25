'use strict';

import userListRoute from './list.route';
import UserListController from './list.controller';

export default angular.module('app.user.list', [])
    .config(userListRoute)
    .controller('UserListController', UserListController);
