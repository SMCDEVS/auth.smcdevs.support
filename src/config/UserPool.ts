import { CognitoUserPool } from "amazon-cognito-identity-js"
import { poolData } from '../model/Datas'

export const UserPool = new CognitoUserPool(poolData)