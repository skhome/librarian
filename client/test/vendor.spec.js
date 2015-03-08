'use strict';

import '../app/vendor';

// use expect mode
chai.expect();

describe('vendor libraries', function () {

    it('should import angular', function () {
        expect(angular).to.exist;
    });

    it('should import angular-animate', function () {
        expect(angular.module('ngAnimate')).to.not.be.undefined;
    });

    it('should import angular-messages', function () {
        expect(angular.module('ngMessages')).to.not.be.undefined;
    });

    it('should import angular-ui-router', function () {
        expect(angular.module('ui.router')).to.not.be.undefined;
    });

    it('should import angular-ui-bootstrap', function () {
        expect(angular.module('ui.bootstrap')).to.not.be.undefined;
    });

    it('should import restangular', function () {
        expect(angular.module('restangular')).to.not.be.undefined;
    });

    it('should import lodash', function () {
        expect(_).to.exist;
    });

});
