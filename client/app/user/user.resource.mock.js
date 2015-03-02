'use strict';

import users from './user.resource.mock.list.json!json';

function userResourceMock ($httpBackend) {
    'ngInject';

    $httpBackend.whenGET(/\/users/)
        .respond((method, url) => {
            console.log('GET', url);
            return [ 200, users ];
        });

    $httpBackend.whenPOST(/\/users/)
        .respond((method, url, data) => {
            console.log('POST', url);
            var dataJson = JSON.parse(data);
            console.log(dataJson);
            if (dataJson.firstName === '503') {
                return [ 503, dataJson ];
            }
            return [ 201, dataJson, { Location: '/api/users/42' } ];
        });

}

export default userResourceMock;
