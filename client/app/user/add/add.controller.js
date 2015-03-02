'use strict';

/**
 * Provides user interaction functionality for the user add modal dialog.
 *
 * @author Sascha Krüger
 */
export default class UserAddController {

    constructor ($modalInstance, UserResource) {
        'ngInject';

        this.$modalInstance = $modalInstance;
        this.UserResource = UserResource;
        this.user = {};
    }

    cancel () {
        this.$modalInstance.dismiss('cancel');
    }

    save () {
        var $modalInstance = this.$modalInstance;
        this.UserResource
            .create(this.user)
            .then(function () {
                $modalInstance.close();
            });
    }

}
