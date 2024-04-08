const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Staff = require('../models/staff');
const Admin = require('../models/admin');
const Tax = require('../models/tax');

/**
 * @description     Create an admin
 * @route           POST /admin/create-admin
 */
const postCreateAdmin = async (req, res, next) => {
    const email = req.body.email;

    try {
        const password = await bcrypt.hash(req.body.password, 12);

        const newAdmin = new Admin({
            email,
            password,
        });
        const admin = await newAdmin.save();

        res.status(201).json({
            message: 'Admin created successfully!',
            admin,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/**
 * @description     Create a staff
 * @route           POST /admin/create-staff
 */
const postCreateStaff = async (req, res, next) => {
    const email = req.body.email;

    try {
        const password = await bcrypt.hash(req.body.password, 12);

        const newStaff = new Staff({
            email,
            password,
        });
        const staff = await newStaff.save();

        res.status(201).json({
            message: 'Staff created successfully!',
            staff,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/**
 * @description     Create a user
 * @route           POST /admin/create-user
 */
const postCreateUser = async (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    try {
        const password = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            name,
            surname,
            email,
            password,
        });
        const userTax = new Tax({ userId: newUser._id });

        const user = await newUser.save();
        await userTax.save();

        res.status(201).json({
            message: 'User created successfully!',
            user,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    postCreateAdmin,
    postCreateStaff,
    postCreateUser,
};
