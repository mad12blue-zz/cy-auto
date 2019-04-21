const mailUtils = require('./cypress/utilities/mail.utils');

mailUtils.getOauthClient('./token.json', './google-creds.json')
    .then(client => {
        return mailUtils.getMessages({ maxResults: 10 }, client);
    }).then(messages => {
        console.log(JSON.stringify(messages));
    })