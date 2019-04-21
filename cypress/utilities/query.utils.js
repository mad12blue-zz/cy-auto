import { CFM_ID } from "./data.utils";
var dateFormat = require('dateformat');

export const loginMutation = (email, password) => {
    return `mutation login {
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
    }`;
} 