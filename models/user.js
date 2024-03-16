const mongoose = require('mongoose');

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
    grossSalary: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true, });

module.exports = mongoose.model('User', userSchema);
