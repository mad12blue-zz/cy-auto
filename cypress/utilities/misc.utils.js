const config = require('../config');
const _ = require('lodash');

const AR_GQL_URL = config.arBackendUrl+'/graphql';
let LOCAL_STORAGE_MEMORY = {};


export const visitUrl = (url) => {
    cy.visit(url, { failOnStatusCode: false });
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const login = (email, password) => {
    const loginMutation = `mutation login {
        login(email: "${email}", password: "${password}"){
            token
            user {
            _id
            email
            currentRole {
                entityId
                name
            }
            }
        }
    }`
    cy.request({
        url: AR_GQL_URL,
        body: { query: loginMutation },
        method: 'POST'
    }).then((response) => {
        cy.log(response);
        const token = _.get(response, 'body.data.login.token');
        const companyId = _.get(response, 'body.data.login.user.currentRole.entityId');
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('companyId', companyId);
    })
    // const response = await gql(AR_GQL_URL, loginMutation, {email, password});
    // console.log(response);
    
}

export const saveLocalStorage = (key) => {
    LOCAL_STORAGE_MEMORY = localStorage.getItem(key);
}

export const restoreLocalStorage = (key) => {
    if (LOCAL_STORAGE_MEMORY) {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY);
    }
}

