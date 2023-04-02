const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/errorHandlers');
const { } = require('../utils/errorHandlers');
const { DEV_MODE, DEV_SECRET, LOGIN_ERROR } = require('../utils/constants')



const handleAuth = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        if (!authorization || !authorization.startsWith(`Bearer `)) {
            next(new Unauthorized(LOGIN_ERROR))
            return
        }
        const token = authorization.replace('Bearer ', '')

        const verifyToken = process.env.NODE_ENV === DEV_MODE ? DEV_SECRET : process.env.WEB_SECRET;

        const payload = jwt.verify(token, verifyToken)


        if (payload) {
            req.user = payload
        }
        else {
            next(new Unauthorized(LOGIN_ERROR))
            return
        }
    } catch (e) {

        next(e)
    }

    next()
}

module.exports = { handleAuth }