'use strict';

/**
 *
 * @param $locationProvider
 * @param RestangularProvider
 *
 * @ngInject
 */
function onConfig ($locationProvider, RestangularProvider) {
    'ngInject';

    // use HTML5 History API
    $locationProvider.html5Mode(true);

    // configure restangular
    RestangularProvider.setBaseUrl('/api');

    // collection resources always wrap the actual array
    RestangularProvider.setResponseInterceptor(function (data, operation) {
        var extractedData = data;
        if (operation === 'getList') {
            extractedData = data.content;
        }
        return extractedData;
    });

}

export default onConfig;
