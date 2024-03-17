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
    role: {
        type: String,
        required: true,
    },
    grossSalary: {
        type: Number,
        required: true,
        default: 0,
    },
    netSalary: {
        socialInsurance: {
            type: Number,
            required: true,
            default: 0,
        },
        generalHealthSystem: {
            type: Number,
            required: true,
            default: 0,
        },
        totalTax: {
            type: Number,
            required: true,
            default: 0,
        },
        monthlyNetSalary: {
            type: Number,
            required: true,
            default: 0,
        },
    },
}, { timestamps: true, });

module.exports = mongoose.model('User', userSchema);
