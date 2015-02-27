'use strict';

class UserAddController {

    constructor ($modalInstance, UserResource) {
        this.$modalInstance = $modalInstance;
        this.UserResource = UserResource;
        this.user = {};
    }

}

export default UserAddController;
