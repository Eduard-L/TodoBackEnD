const mongoose = require('mongoose');


const container = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    tasks: {
        type: Object,
        default: [],
        required: true
    },
    board: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
        select: false,
    },

})

module.exports = mongoose.model('container', container)