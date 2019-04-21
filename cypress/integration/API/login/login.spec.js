/// <reference types="Cypress" />

const loginUtils = require('../../../utilities/API/login.utils');
const dataUtils = require('../../../utilities/data.utils');
const _ = require('lodash');

describe('Login', () => {

    _.get(dataUtils.DATA, 'data').forEach(data => {

        it(`${_.get(data, 'username')} : should get the auth token`, async () => {
            await loginUtils.login(_.get(data, 'username'), _.get(data, 'password'), function (authToken) {
                dataUtils.AUTH_TOKEN = authToken;            
            });
        });

        it(`${_.get(data, 'username')} : should get the company id and cfm id`, async () => {
            await loginUtils.getCompany(dataUtils.AUTH_TOKEN, function (compData) {
                dataUtils.COMPANY_ID = compData[0];  
                dataUtils.CFM_ID = compData[1];    
            });
        });

    });

});