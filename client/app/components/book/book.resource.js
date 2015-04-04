'use strict';

class BookResource {

    constructor (Restangular) {
        'ngInject';

        this.Restangular = Restangular;
    }

    findAll () {
        return this.Restangular.all('books').getList();
    }
}

export default BookResource;
