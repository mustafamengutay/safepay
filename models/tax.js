const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    grossSalary: {
        type: Number,
        default: 0,
        min: 0,
    },
    monthlyNetSalary: {
        type: Number,
        default: 0,
        min: 0,
    },
    tax: {
        socialInsurance: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        generalHealthSystem: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        incomeTax: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        totalTaxAmount: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
    },
    status: {
        type: String,
        default: 'not calculated',
        required: true,
    },
});

module.exports = mongoose.model('Tax', taxSchema);
