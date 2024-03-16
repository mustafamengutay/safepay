const User = require('../models/user');
const tax = require('../utils/tax');

const postCalculateTaxes = async (req, res, next) => {
    const userId = req.body.userId;
    const grossSalary = req.body.grossSalary;

    const taxes = tax.calculate(grossSalary);

    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        // TODO: Apply the DES algorithm
        user.netSalary.socialInsurance = taxes.socialInsurance;
        user.netSalary.generalHealthSystem = taxes.generalHealthSystem;
        user.netSalary.totalTax = taxes.totalTax;
        user.netSalary.monthlyNetSalary = taxes.monthlyNetSalary;
        await user.save();
        res.status(200).json({
            message: 'Taxes calculated!',
            netSalary: user.netSalary,
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
};
