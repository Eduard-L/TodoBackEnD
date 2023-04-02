const containerRouter = require('express').Router()

const { handleCreateTask, handleDeleteTask, handleUpdateTask } = require('../controllers/task');
const { handleGetAllContainers, handleDeleteContainer } = require('../controllers/containers');

containerRouter.get('/', handleGetAllContainers);
containerRouter.delete('/:id', handleDeleteContainer)

containerRouter.post('/:id/task', handleCreateTask)
containerRouter.delete('/:id/task/:taskId', handleDeleteTask)

containerRouter.patch('/:id/task/:taskId', handleUpdateTask)


module.exports = { containerRouter }