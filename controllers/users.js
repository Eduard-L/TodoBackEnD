
const User = require('../models/user')
const { NotFoundError, BadRequestError } = require('../utils/errorHandlers');
const { NOT_VALID_DATA, DATA_NOT_FOUNDED } = require('../utils/constants')

const handleGetUserInfo = async (req, res, next) => {
    const { _id } = req.user
    try {


        const user = await User.findById({ _id })


        if (user === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
        }


        res.status(200).send(user)


    } catch (e) {

        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }
        next(e);
    }
}

const updateUserInfo = async (req, res, next) => {
    const { _id } = req.user;
    const { email, name, boards } = req.body

    try {
        const userToUpdate = await User.findById(_id)
        if (userToUpdate === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
            return
        }
        const updatedUser = await User.findByIdAndUpdate(_id, { email: email, name: name, boards: boards }, { new: true })
        if (updatedUser) {
            res.status(200).send(updatedUser)
        } else {
            throw new Error()
        }
    } catch {
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }

        next(e);
    }
}

module.exports = { handleGetUserInfo, updateUserInfo }