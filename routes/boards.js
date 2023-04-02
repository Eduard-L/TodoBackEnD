const boardsRouter = require('express').Router()
const { handleCreateBoard, handleGetBoard, handleGetBoards, handleUpdateBoardInfo, handleDeleteBoard } = require('../controllers/board')
const { handleNewContainer, handleUpdateContainer } = require('../controllers/containers');



boardsRouter.post('/', handleCreateBoard)
boardsRouter.get('/:boardId', handleGetBoard)
boardsRouter.get('/', handleGetBoards)
boardsRouter.patch('/:boardId', handleUpdateBoardInfo)
boardsRouter.delete('/:boardId', handleDeleteBoard)
boardsRouter.put('/containers/:id', handleUpdateContainer)
boardsRouter.post('/container', handleNewContainer)

module.exports = { boardsRouter }