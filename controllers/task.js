const Task = require('../models/task');
const Container = require('../models/container')
const { BadRequestError, NotFoundError, ForbiddentError } = require('../utils/errorHandlers');
const { NOT_VALID_DATA, DATA_NOT_FOUNDED } = require('../utils/constants')

const handleCreateTask = async (req, res, next) => {
    const { title } = req.body;
    const { id } = req.params
    try {
        const container = await Container.findById(id)
        if (container === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
        }

        const task = await Task.create({ title, container: id })

        if (task) {
            res.status(201).send(task)
        } else {
            throw new Error()
        }

    } catch (e) {
        if (e.name === 'ValidationError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }
        next(e);
    }

}

const handleDeleteTask = async (req, res, next) => {
    const { _id } = req.user
    const { id, taskId } = req.params;
    try {

        const container = await Container.findById(id).select('+owner')
        const task = await Task.findById(taskId)

        if (container === null || task === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
            return
        }


        const deletedTask = await Task.findByIdAndDelete(taskId)

        if (deletedTask) {
            res.status(200).send(deletedTask)
        }
        else {
            throw new Error
        }
    } catch (e) {
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));

            return;
        }
        next(e);
    }
}

const handleUpdateTask = async (req, res, next) => {
    const { id, taskId } = req.params
    const { title, description } = req.body;

    try {
        const container = await Container.findById(id)
        const taskToUpdate = await Task.findById(taskId)

        if (taskToUpdate === null || container === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
            return
        }

        const task = await Task.findByIdAndUpdate(taskId, { title: title, description: description }, { new: true });

        if (task) {
            res.status(200).send(task)
        } else {
            throw new Error()
        }
    }
    catch (e) {
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }

        next(e);
    }


}

module.exports = { handleCreateTask, handleDeleteTask, handleUpdateTask }