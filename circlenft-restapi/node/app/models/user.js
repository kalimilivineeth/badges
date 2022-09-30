// const { boolean, date } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true
    },
    passwordAllocatedBy: {
        type: Boolean,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().required(),
        passwordAllocatedBy: Joi.boolean().required()
        
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
