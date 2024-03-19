const User = require('../models/user');

/**
 * @description     Update a user's gross salary
 * @route           PATCH /user/gross-salary
 */
const updateUserGrossSalary = async (req, res, next) => {
    const userId = req.userId;
    const grossSalary = req.body.grossSalary;

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        // TODO: Apply the DES algorithm
        user.grossSalary = grossSalary;
        user.netSalary.socialInsurance = 0;
        user.netSalary.generalHealthSystem = 0;
        user.netSalary.totalTax = 0;
        user.netSalary.monthlyNetSalary = 0;
        user.status = 'not calculated';
        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Gross salary updated!',
            user: updatedUser,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/**
 * @description     Get a user's taxes
 * @route           GET /user/get-taxes
 */
const getTaxes = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (user.status === 'not calculated') {
            return res.status(200).json({
                message: 'Your taxes have not been calculated yet.',
            });
        } else if (user.status === 'paid') {
            return res.status(200).json({
                message: 'You have already paid your taxes.',
            });
        }

        res.status(200).json({
            message: `${user.name} ${user.surname}'s taxes were fetched successfully!`,
            status: user.status,
            taxes: {
                grossSalary: user.grossSalary,
                socialInsurance: user.netSalary.socialInsurance,
                generalHealthSystem: user.netSalary.generalHealthSystem,
                monthlyNetSalary: user.netSalary.monthlyNetSalary,
                totalTax: user.netSalary.totalTax,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/**
 * @description     Pay taxes
 * @route           POST /user/pay-taxes
 */
const postPayTaxes = async (req, res, next) => {
    const userId = req.userId;
    const amount = Number(req.body.amount);

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (user.status === 'not calculated') {
            return res.status(200).json({
                message: 'Your taxes have not been calculated yet.',
            });
        }

        if (amount < user.netSalary.totalTax) {
            const error = new Error('You do not have enough money to pay your taxes!');
            error.statusCode = 404;
            return next(error);
        } else if (amount > user.netSalary.totalTax) {
            const error = new Error('You entered more than your tax fee.');
            error.statusCode = 404;
            return next(error);
        } else if (amount === 0) {
            const error = new Error('You tried to pay 0 Euros.');
            error.statusCode = 404;
            return next(error);
        }

        user.netSalary.totalTax -= amount;
        user.grossSalary = 0;
        user.netSalary.socialInsurance = 0;
        user.netSalary.generalHealthSystem = 0;
        user.status = 'paid';
        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Your taxes were successfully paid!',
            netSalary: updatedUser,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    getTaxes,
    postPayTaxes,
    updateUserGrossSalary,
};
