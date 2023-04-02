const User = require("../models/user")
const { BadRequestError, Unauthorized } = require("../utils/errorHandlers");
const jwt = require('jsonwebtoken');
const { LOGIN2_ERROR, NOT_VALID_DATA, DEV_MODE, DEV_SECRET } = require('../utils/constants')




const handleLogin = async (req, res, next) => {
    const { password, email } = req.body

    try {
        if (!password || !email) {
            next(new BadRequestError(NOT_VALID_DATA))

        }

        const user = await User.findUserByCredentials(email, password)

        if (user) {

            const token = await jwt.sign({ _id: user._id }, process.env.NODE_ENV === DEV_MODE ? DEV_SECRET : process.env.WEB_SECRET, { expiresIn: '3d' });
            res.status(200).json(token);
            return
        }
        else {
            next(new Unauthorized(LOGIN2_ERROR));
        }
    }
    catch (e) {
        next(new Unauthorized(LOGIN2_ERROR))
    }
}

module.exports = {
    handleLogin
}