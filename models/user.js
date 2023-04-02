const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const { LOGIN2_ERROR } = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
        },

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
    password: {
        type: String,
        minlength: 8,
        required: true,
        select: false
    },
    boards: {
        type: Object,
        default: [],
        required: true
    }


})

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {

    try {

        const user = await this.findOne({ email }).select('+password');

        if (!user) {
            return Promise.reject(new Unauthorized(LOGIN2_ERROR));
        }
        const pasVerification = await bcrypt.compare(password, user.password);
        if (!pasVerification) {
            return Promise.reject(new Unauthorized(LOGIN2_ERROR));
        }

        return user;
    } catch (e) {
        return Promise.reject(new Unauthorized(LOGIN2_ERROR));
    }
};

module.exports = mongoose.model('user', userSchema);