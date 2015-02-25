'use strict';

import UserResource from './user.resource';

import userListModule from './list/list.module';

export default angular.module('app.user', [
    userListModule.name
]).service('UserResource', UserResource);
