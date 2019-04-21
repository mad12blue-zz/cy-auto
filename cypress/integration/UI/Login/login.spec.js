/// <reference types="Cypress" />

const loginUtils = require('../../../utilities/UI/login.utils');
const miscUtils = require('../../../utilities/misc.utils');
const dataUtils = require('../../../utilities/data.utils');

describe('Login', () => {

    beforeEach(() => {
        miscUtils.logout();
    });

    it('should work for a valid user', () => {
        miscUtils.visitUrl(dataUtils.PAGE_URL);
        loginUtils.populateCredentials(dataUtils.USERNAME, dataUtils.PASSWORD);
        loginUtils.clickLogin();
    });

    it('should fail for an invalid user', () => {
        miscUtils.visitUrl(dataUtils.PAGE_URL);
        loginUtils.populateCredentials(dataUtils.USERNAME, dataUtils.PASSWORD+'1');
        loginUtils.clickLogin();
        cy.get('#auth_err').contains('Invalid credentials');
    });
});