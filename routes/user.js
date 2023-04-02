const userRouter = require('express').Router()
const { handleGetUserInfo, updateUserInfo } = require('../controllers/users');


userRouter.get('/', handleGetUserInfo);
userRouter.put('/', updateUserInfo)


module.exports = { userRouter }

