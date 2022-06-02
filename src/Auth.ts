import * as AWSCognitoIdentity from 'amazon-cognito-identity-js'
import { userData, authenticationData, emailData } from './model/Datas'
import { UserPool } from './config/UserPool'

/**
 *
 * @param Username
 * @param Password
 * @param Email
 */
export function signUp({ Username, Password, Email }: { Username: string, Password: string, Email: string }): { message: string } {
    emailData.Value = Email
    let attributeList: AWSCognitoIdentity.CognitoUserAttribute[] = [
        new AWSCognitoIdentity.CognitoUserAttribute(emailData)
    ]
    let resultMessage: { message: string } = { message: '' }

    UserPool.signUp(Username, Password, attributeList, attributeList,
        (err: Error | undefined, result: AWSCognitoIdentity.ISignUpResult | undefined): void => {

        if(err) {
            resultMessage = {
                message: err.message || JSON.stringify(err)
            }
            return
        }

        resultMessage = {
            message: result?.user.getUsername() + '님, 가입 요청이 성공적으로 완료되었습니다. ' +
                '관리자의 승인을 기다려 주세요.'
        }

    })

    return resultMessage
}

/**
 *
 * @param Username
 * @param Password
 */
export function signIn({Username, Password}: { Username: string, Password: string }): string {
    userData.Username = Username
    const cognitoUser: AWSCognitoIdentity.CognitoUser = new AWSCognitoIdentity.CognitoUser(userData)

    authenticationData.Username = Username
    authenticationData.Password = Password
    const authenticationDetails: AWSCognitoIdentity.AuthenticationDetails = new AWSCognitoIdentity.AuthenticationDetails(authenticationData)

    let jwtToken: string = ''

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: AWSCognitoIdentity.CognitoUserSession) {
            jwtToken = result.getAccessToken().getJwtToken()
        },

        onFailure: function (err) {
            console.log(err)
        }
    })

    return jwtToken
}