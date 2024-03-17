const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Admin = require('../models/admin');
const Staff = require('../models/staff');

/**
 * @description     Login to the system as a user
 * @route           POST /login
 */
const postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = await Staff.findOne({ email });
        }
        if (!user) {
            user = await Admin.findOne({ email });
        }
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            return next(error);
        }

        const isPasswordCorrent = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrent) {
            const error = new Error('Wrong password.');
            error.statusCode = 401;
            return next(error);
        }

        const token = jwt.sign({
            email: user.email,
            userRole: user.role,
            userId: user._id.toString(),
        },
            'cmpe455supersecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token: token,
            userId: user._id.toString(),
            userRole: user.role,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    postLogin,
};
