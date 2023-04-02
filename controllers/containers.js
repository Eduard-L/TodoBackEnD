
const Container = require('../models/container');
const { BadRequestError, NotFoundError } = require('../utils/errorHandlers');
const { NOT_VALID_DATA, DATA_NOT_FOUNDED } = require('../utils/constants')

const handleNewContainer = async (req, res, next) => {

    const { _id } = req.user;
    const { title, boardId, tasks } = req.body

    try {

        const container = await Container.create({ title, tasks, board: boardId })
        if (container) {
            res.status(201).send(container)
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

const handleGetAllContainers = async (req, res, next) => {
    const { _id } = req.user;


    try {
        let allCons = await Container.find({}).select('+owner');
        if (allCons) {
            allCons = allCons.filter((c) => c.owner._id.toHexString() === _id);
            res.status(200).send(allCons)
        }
        else {
            throw new Error()
        }

    } catch (e) {
        next(e)
    }

}

const handleDeleteContainer = async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        const conToDelete = await Container.findById(id).select('+owner');

        if (conToDelete === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED));
            return;
        }
        // console.log(conToDelete)
        // if (conToDelete.owner._id.toHexString() !== _id) {
        //     next(new ForbiddentError('you are not alloweded to delete this container'))
        //     return
        // }
        const container = await Container.findByIdAndDelete(id)
        if (container) {
            res.status(200).send(container)
        }
        else {
            throw new Error()
        }
    }
    catch (e) {
        console.log(e)
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));

            return;
        }
        next(e);

    }
}
const handleUpdateContainer = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;
    const { tasks, title } = req.body

    try {

        const conToUpdate = await Container.findById(id).select('+owner')


        if (conToUpdate === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
            return
        }
        // if (conToUpdate.owner._id.toHexString() !== _id) {
        //     next(new ForbiddentError('you are not alloweded to delete this container'))
        //     return
        // }
        const updatedCon = await Container.findByIdAndUpdate(id, { tasks: tasks, title: title }, { new: true })
        if (updatedCon) {
            res.status(200).send(updatedCon)
        } else {
            throw new Error()
        }

    } catch (e) {
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }

        next(e);
    }


}

module.exports = { handleNewContainer, handleGetAllContainers, handleDeleteContainer, handleUpdateContainer }