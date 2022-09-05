import * as AWSCognitoIdentity from 'amazon-cognito-identity-js';
import { poolData, userData, authenticationData, emailData } from './data';
import {CognitoUserPool} from "amazon-cognito-identity-js";


/**
 *
 * @param {string} Username
 * @param {string} Password
 * @param {string} Email
 */
export async function signUp({ Username, Password, Email }: { Username: string, Password: string, Email: string }): Promise<{ message: string }> {
    emailData.Value = Email;
    let attributeList: AWSCognitoIdentity.CognitoUserAttribute[] = [
        new AWSCognitoIdentity.CognitoUserAttribute(emailData)
    ];

    let resultMessage: { message: string } = await new Promise((resolve, reject) => {

        const userPool = new CognitoUserPool(poolData);

        userPool.signUp(Username, Password, attributeList, attributeList,
                (err: Error | undefined, result: AWSCognitoIdentity.ISignUpResult | undefined): void => {

                if(err)
                    reject({ message: err.message || JSON.stringify(err) })
                else
                    resolve({ message: `User ${result?.user.getUsername()}, sign up successfully.` })

            });
    })

    return resultMessage;
}

/**
 *
 * @param {string} Username
 * @param {string} Password
 */
export async function signIn({ Username, Password }: { Username: string, Password: string }): Promise<string> {
    userData.Username = Username;
    const cognitoUser: AWSCognitoIdentity.CognitoUser = new AWSCognitoIdentity.CognitoUser(userData);

    authenticationData.Username = Username;
    authenticationData.Password = Password;
    const authenticationDetails: AWSCognitoIdentity.AuthenticationDetails = new AWSCognitoIdentity.AuthenticationDetails(authenticationData);


    let result: string = await new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result: AWSCognitoIdentity.CognitoUserSession) {
                resolve(result.getIdToken().getJwtToken());
            },

            onFailure: function (err) {
                reject(err.message || err);
            }
        })
    });

    return result;
}

/**
 *
 * @param {string} Username
 * @param {string} ConfirmationCode
 */
export async function confirm({ Username, ConfirmationCode }: { Username: string, ConfirmationCode: string }): Promise<any> {
    userData.Username = Username;
    const cognitoUser: AWSCognitoIdentity.CognitoUser = new AWSCognitoIdentity.CognitoUser(userData);

    return await new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(ConfirmationCode, true, (err, result) => {
            if(err)
                reject(err.message || JSON.stringify(err));
            else
                resolve(result);
        })
    })
}