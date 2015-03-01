'use strict';

import users from './fixtures/users.fixture.json!json';

function userResourceMock ($httpBackend) {
    'ngInject';

    $httpBackend.whenGET(/\/users/)
        .respond((method, url) => {
            console.log('GET', url);
            return [ 200, users ];
        });

}

export default userResourceMock;
