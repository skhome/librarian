'use strict';

import books from './book.resource.mock.list.json!json';

function bookResourceMock ($httpBackend) {
    'ngInject';

    $httpBackend.whenGET(/\/books/)
        .respond((method, url) => {
            console.log('GET', url);
            return [ 200, books ];
        });

}

export default bookResourceMock;
