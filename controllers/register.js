const User = require('../models/user.js');
const { ConflictError, BadRequestError } = require('../utils/errorHandlers');
const bcrypt = require('bcryptjs');
const { SALT } = require('../utils/constants');
const { CONFLICT_ERROR, NOT_VALID_DATA } = require('../utils/constants')

const handleRegister = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const isUserExcist = await User.findOne({ email });

        if (isUserExcist) {

            next(new ConflictError(CONFLICT_ERROR))
            return
        }

        const hashPass = await bcrypt.hash(password, SALT);

        if (hashPass) {
            const newUser = await User.create({ name, email, password: hashPass })
            if (newUser) {
                res.status(201).send({ name, email })
            }
            else {
                throw new Error()
            }
        }
        else {
            throw new Error()
        }
    }
    catch (e) {

        if (e.name === 'ValidationError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }
        next(e);
    }
}

module.exports = {
    handleRegister
}