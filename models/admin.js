const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
        default: 'admin',
        required: true,
    },
}, { timestamps: true, });

module.exports = mongoose.model('Admin', adminSchema);
