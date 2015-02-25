'use strict';

class UserResource {

    constructor (Restangular) {
        this.Restangular = Restangular;
    }

    findOne (id) {
        return this.Restangular.one('users', id).get();
    }

    findAll () {
        return this.Restangular.all('users').getList();
    }

}

export default UserResource;
