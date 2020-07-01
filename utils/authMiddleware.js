const message = require('../config/messages')


async function verifySubscription(req, res, next) {
    // Verfies the subscription key is valid for API request
    try {
        const SUBSCRIPTION_KEY = process.env.APP_SUBSCRIPTION_KEY;
        if (req && req.headers && req.headers[`app-subscription-key`]) {
            if(req.headers[`app-subscription-key`]===SUBSCRIPTION_KEY){
                next();
            }else{
                return _handleResponse(req, res, {code:401,message:message.error.SUBSCRIPTION_KEY_NOT_INVALID})
            }
        }else{
            return _handleResponse(req, res, {code:401,message:message.error.SUBSCRIPTION_KEY_NOT_FOUND})
        }
    }catch(e){
        console.log("ERROR :verifyJWT :::::", e)
        return _handleResponse(req, res, {code:500,message:e.message||e})
    }
}


module.exports = {
    verifySubscription
}