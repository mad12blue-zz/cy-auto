// SELECTORS
const dataUtils = require('../../utilities/data.utils');
const Promise = require('bluebird');
const EMAIL_INPUT = '[data-testid="logininput"]';
const PASSWORD_INPUT = '[data-testid="passwordinput"]';
const LOGIN_BUTTON = '[style="display: flex; flex-flow: row wrap; align-items: center; margin-bottom: 30px; margin-top: 20px; font-size: 13px; color: rgb(46, 59, 66);"] > div';
const FORGOT_PASSWORD = '[data-testid="text-forgot-password"]';
const RESET_PASSWORD = '[data-testid="button-reset-password"]';
const NEW_PASSWORD = '[id="password_validator"]';
const CONFIRM_PASSWORD = '[placeholder="Confirm Password"]';

const USER_DROPDOWN = '[data-testid="user-profile-dropdown"]';
const SIGN_OUT = 'Sign Out';
const INVALID_CREDENTAILS = 'Invalid credentials'
const _ = require('lodash');


// UTILITY METHODS
export const populateCredentials = (email, password) => {
    if(email){
        cy.get(EMAIL_INPUT)
            .type(email);
    }
    cy.get(PASSWORD_INPUT)
        .type(password);
}

export const clickLogin = () => {
    cy.get(LOGIN_BUTTON)
        .click();
}

export const clickForgotPassword = () => {
    cy.get(FORGOT_PASSWORD)
        .click();
}

export const clickResetPassword = () => {
    cy.get(RESET_PASSWORD)
        .click();
}

export const clickUserDropdown = () => {
    cy.get(USER_DROPDOWN)
        .click();
} 

export const clickSignOut = () => {
    cy.contains(SIGN_OUT)
        .click();
} 

export const getEmailContentFromInbox = async (uuid, count, callback) => {
    cy.wait(5000);
    const deferred = Promise.defer();
    for (var i = 0; i < count; i++) {
        await cy.task('getMessages', 1).then(messages => {
            var arrayLength = messages.length;
            //console.log('---------------getEmailContentFromInbox', messages);
            for (var i = 0; i < arrayLength; i++) {                  
                    if(messages[i].indexOf(uuid) >= 0) {  
                        console.log('enteref if loop');
                        let url = messages[i].slice(messages[i].indexOf('href="https://'), messages[i].indexOf(uuid)).match(/"([^']+)"/)[1];
                        deferred.resolve(callback(url.slice(url.indexOf('https://'))));
                        console.log(url);
                        break;
                    }
                }
        });
    }
    return deferred.promise;
}

export const getRedirectUrl =  async (resetPasswordUrl) => {
  const res = await cy.request({
      url: resetPasswordUrl,
      method: 'POST',
      failOnStatusCode: false
    });
    
    var redirectUrlArray = _.get(res, 'redirects');
  return _.head(redirectUrlArray).split(" ")[1];
} 

export const typeNewPassword = async (type, password) => {
    if (type === 'new' ){
         cy.get(NEW_PASSWORD)
          .type(password);
    }
    else if (type === 'confirm' ){
       cy.get(CONFIRM_PASSWORD)
        .type(password);
    }
    else 
      return 0;
  }

  export const saveNewpassword = () => {
    cy.contains('Save').click();
  }
