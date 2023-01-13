module.exports.respSuccess = (body) => {
    const response = {
        isSuccess: true,
        message: null,
        body: body
    }
    return response;
}

module.exports.respFail = (message) => {
    const response = {
        isSuccess: false,
        message: message,
        body: null
    }
    return response;
}