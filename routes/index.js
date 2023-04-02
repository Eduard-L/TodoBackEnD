const centerRouter = require('express').Router();
const { handleNotFoundPage } = require('../controllers/notFoundPage');
const { handleLogin } = require('../controllers/login')
const { handleRegister } = require('../controllers/register');
const { handleAuth } = require('../middlewares/auth');

const { boardsRouter } = require('./boards');
const { containerRouter } = require('./containers')
const { userRouter } = require('./user')

centerRouter.post('/signup', handleRegister);
centerRouter.post('/signin', handleLogin);

// centerRouter.use(handleAuth)

centerRouter.use('/boards', handleAuth, boardsRouter)
centerRouter.use('/containers', handleAuth, containerRouter)
centerRouter.use('/user', handleAuth, userRouter)


centerRouter.use('*', handleNotFoundPage)




module.exports = { centerRouter }