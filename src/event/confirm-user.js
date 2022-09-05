exports.handler = (event) => {

    event.response.autoConfirmUser = true;

    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }

    return event;
};