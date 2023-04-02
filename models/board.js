const mongoose = require('mongoose');
const validator = require('validator');


const board = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    img: {
        type: String,
        validate: {
            validator(v) {
                return validator.isURL(v)
            }
        },
        default: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
    },
    containers: {
        type: Object,
        default: [],
        required: true
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        select: false,
    },


})

module.exports = mongoose.model('board', board)