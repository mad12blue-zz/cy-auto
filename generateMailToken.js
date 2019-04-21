const { generateToken } = require('./cypress/utilities/mail.utils');

const TOKEN_PATH = './token.json';

generateToken(TOKEN_PATH);