const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    username: {
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
}, { timestamps: true, });

module.exports = mongoose.model('Staff', staffSchema);
