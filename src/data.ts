import * as AWSCognitoIdentity from 'amazon-cognito-identity-js'

export const poolData: AWSCognitoIdentity.ICognitoUserPoolData = {
    UserPoolId: process.env.USER_POOL_ID!,
    ClientId: process.env.CLIENT_ID!
}

export let userData: AWSCognitoIdentity.ICognitoUserData = {
    Username: '',
    Pool: new AWSCognitoIdentity.CognitoUserPool(poolData)
}

export let authenticationData: AWSCognitoIdentity.IAuthenticationDetailsData = {
    Username: '',
    Password: ''
}

export let emailData: AWSCognitoIdentity.ICognitoUserAttributeData = {
    Name: 'email',
    Value: ''
}

