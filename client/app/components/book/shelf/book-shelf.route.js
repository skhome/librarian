'use strict';

import template from './book-shelf.html!text';

/**
 * Define the route for the book shelf.
 */
export default function configureBookShelfRoutes ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('shelf', {
            url: '/',
            template: template,
            controller: 'BookShelfController as shelfCtrl',
            resolve: {
                books: BookResource => BookResource.findAll()
            }
        });
}
