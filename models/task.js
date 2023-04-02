const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    container: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'container',

    },
    description: {
        type: String,
        default: ''
    }

})

module.exports = mongoose.model('task', task)