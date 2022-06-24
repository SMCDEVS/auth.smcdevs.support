import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { signUp, signIn } from "./Auth";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let result: { [key: string]: any } = {}

    switch (event.httpMethod) {
        case 'POST':
            let body = JSON.parse(event.body!)
            if(event.path == '/signup') {

                result['message'] = await signUp({
                    Username: body.Username,
                    Password: body.Password,
                    Email: body.Email
                })

            } else if(event.path == '/signin') {

                result['result'] = await signIn({
                    Username: body.Username,
                    Password: body.Password
                })

            } else {
                result['errorMessage'] = `Unauthorized path ${ event.path }`
            }
            break;
        default:
            result['errorMessage'] = `Unauthorized method ${ event.httpMethod }`
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};