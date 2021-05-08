const response = (success, message, result=[], token = "") => {
    const res = {
        success: success,
        message: message,
        result: result,
        token: token
    }
    return res;
}

module.exports = response;