'use strict';

import UserResource from './user.resource';

import userListModule from './list/list.module';
import userAddModule from './add/add.module';

export default angular.module('app.user', [
    userListModule.name,
    userAddModule.name
]).service('UserResource', UserResource);
