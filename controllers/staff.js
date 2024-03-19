const User = require('../models/user');
const tax = require('../utils/tax');

/**
 * @description     Calculate a user's taxes
 * @route           POST /staff/calculate-taxes
 */
const postCalculateTaxes = async (req, res, next) => {
    const userId = req.body.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (user.status === 'unpaid') {
            return res.status(200).json({
                message: 'Taxes have already been calculated!',
                user,
            });
        }

        const taxes = tax.calculate(user.grossSalary);

        // TODO: Apply the DES algorithm
        user.netSalary.socialInsurance = taxes.socialInsurance;
        user.netSalary.generalHealthSystem = taxes.generalHealthSystem;
        user.netSalary.totalTax = taxes.totalTax;
        user.netSalary.monthlyNetSalary = taxes.monthlyNetSalary;
        user.status = 'unpaid';
        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Taxes calculated!',
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
 * @description     Update a user's taxes based on entered taxes.
 * @route           PATCH /staff/update-user-tax
 */
const updateUserTax = async (req, res, next) => {
    const userId = req.body.userId; // for test
    let grossSalary;
    const monthlyTax = req.body.monthlyTax;
    const socialInsurance = req.body.socialInsurance;
    const generalHealthSystem = req.body.generalHealthSystem;

    try {
        const user = await User.findById(userId);
        grossSalary = user.grossSalary;
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        const updatedTaxes = tax.update({
            monthlyTax: Number(monthlyTax),
            grossSalary: Number(grossSalary),
            socialInsurance: Number(socialInsurance),
            generalHealthSystem: Number(generalHealthSystem),
        });

        // TODO: Apply the DES algorithm
        user.netSalary.socialInsurance = socialInsurance;
        user.netSalary.generalHealthSystem = generalHealthSystem;
        user.netSalary.totalTax = updatedTaxes.totalTax;
        user.netSalary.monthlyNetSalary = updatedTaxes.monthlyNetSalary;
        user.status = 'unpaid';
        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Taxes updated!',
            user: updatedUser,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    postCalculateTaxes,
    updateUserTax,
};
