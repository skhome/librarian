'use strict';

import headerTemplate from './layout/header/layout.header.html!text';

export default angular.module('app.core', [])
    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('app/core/layout/header/layout.header.html', headerTemplate);
    }]);
