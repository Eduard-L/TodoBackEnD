const Board = require('../models/board')
const { BadRequestError, NotFoundError, ForbiddentError } = require('../utils/errorHandlers')
const { NOT_VALID_DATA, DATA_NOT_FOUNDED, FORBIDDEN_ERROR } = require('../utils/constants')


const handleCreateBoard = async (req, res, next) => {
    const { _id } = req.user
    const { title } = req.body
    try {
        const board = await Board.create({ title, owner: _id })
        if (board) {
            res.status(201).send(board)
        }

    } catch (e) {
        console.log(e)
        if (e.name === 'ValidationError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }
        next(e);
    }


}

const handleGetBoard = async (req, res, next) => {

    const { boardId } = req.params
    const { _id } = req.user
    try {
        const board = await Board.findById(boardId).select('+owner');

        if (board === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED))
            return
        }

        else if (_id !== board.owner._id.toHexString()) {
            next(new ForbiddentError(FORBIDDEN_ERROR))
            return
        }

        res.status(200).send(board)

    }
    catch (e) {
        if (e.name === 'CastError') {
            next(new BadRequestError(NOT_VALID_DATA));
            return;
        }
        next(e)
    }

}

const handleGetBoards = async (req, res, next) => {
    const { _id } = req.user;

    try {
        let allBoards = await Board.find({}).select('+owner');

        if (allBoards) {
            allBoards = allBoards.filter((b) => b.owner._id.toHexString() === _id)
            res.status(200).send(allBoards)
        } else {
            throw new Error()
        }
    }
    catch (e) {
        next(e)
    }

}

const handleUpdateBoardInfo = async (req, res, next) => {
    const { _id } = req.user;
    const { boardId } = req.params;
    const { title, containers, img } = req.body

    try {
        const board = await Board.findById(boardId).select("+owner")

        if (board === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED));
            return
        }
        if (board.owner._id.toHexString() !== _id) {
            next(new ForbiddentError(FORBIDDEN_ERROR))
            return
        }

        const updatedBoard = await Board.findByIdAndUpdate(boardId, { title: title, img: img, containers: containers }, { new: true })
        if (updatedBoard) {
            res.status(200).send(updatedBoard)
        }
        else {
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
const handleDeleteBoard = async (req, res, next) => {
    const { _id } = req.user;
    const { boardId } = req.params;


    try {
        const board = await Board.findById(boardId).select("+owner")

        if (board === null) {
            next(new NotFoundError(DATA_NOT_FOUNDED));
            return
        }
        if (board.owner._id.toHexString() !== _id) {
            next(new ForbiddentError(FORBIDDEN_ERROR))
            return
        }

        const deletedBoard = await Board.findByIdAndRemove(boardId)
        if (deletedBoard) {
            res.status(200).send(deletedBoard)
        }
        else {
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


module.exports = { handleCreateBoard, handleGetBoard, handleGetBoards, handleUpdateBoardInfo, handleDeleteBoard }