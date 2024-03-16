const User = require('../models/user');

/**
 * @description     Update a user's gross salary
 * @route           PATCH /user/gross-salary
 */
const updateUserGrossSalary = async (req, res, next) => {
    const userId = req.body.id; // for test
    const grossSalary = req.body.grossSalary;

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }
        user.grossSalary = grossSalary;
        await user.save();

        res.status(200).json({
            message: 'Gross salary updated!',
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
    updateUserGrossSalary,
};
