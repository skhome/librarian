'use strict';

// use expect mode
chai.expect();

// import unit under test
import mainModule from '../app/main';

describe('main module', function () {

    it('should require angular-animate', function () {
        expect(mainModule.requires).to.contain('ngAnimate');
    });

    it('should require angular-messages', function () {
        expect(mainModule.requires).to.contain('ngMessages');
    });

    it('should require restangular', function () {
        expect(mainModule.requires).to.contain('restangular');
    });

    it('should require core module', function () {
        expect(mainModule.requires).to.contain('app.core');
    });

});
