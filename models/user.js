const mongoose = require('mongoose');
const Tax = require('../models/tax');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true,
    },
    tax: {
        type: mongoose.Types.ObjectId,
        ref: 'Tax',
    },
}, { timestamps: true, });

module.exports = mongoose.model('User', userSchema);
