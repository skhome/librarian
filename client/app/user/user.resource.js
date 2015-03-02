'use strict';

class UserResource {

    constructor (Restangular) {
        'ngInject';

        this.Restangular = Restangular;
    }

    findOne (id) {
        return this.Restangular.one('users', id).get();
    }

    findAll () {
        return this.Restangular.all('users').getList();
    }

    create (user) {
        return this.Restangular.all('users').post(user);
    }
}

export default UserResource;
