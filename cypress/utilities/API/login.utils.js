const config = require('../../config');
const _ = require('lodash');
const dataUtils = require('../../utilities/data.utils');
const queryUtils = require('../../utilities/query.utils');
const AR_GQL_URL = config.arBackendUrl+'/graphql';
let LOCAL_STORAGE_MEMORY = {};

export const logout = async () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const login = async (email, password, callback) => {

    const res = await cy.request({
        url: AR_GQL_URL,
        body: { query: queryUtils.loginMutation(email, password) },
        method: 'POST',
        failOnStatusCode: false
    })    
    callback(_.get(res, 'body.data.login.token'));
}

export const getCompany = async (authToken, callback) => {    
    
    const res = await cy.request({
        url: AR_GQL_URL,
        body: { query: queryUtils.getCompanyMutation() },
        method: 'POST',
        headers: {
            'Authorization': authToken
          },
        failOnStatusCode: false
    })    
    callback([_.get(res, 'body.data.currentCompany._id'), _.get(res, 'body.data.currentCompany.cfmId')]);
}
