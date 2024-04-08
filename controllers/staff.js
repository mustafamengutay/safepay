const User = require('../models/user');
const Tax = require('../models/tax');

const taxCalculator = require('../utils/tax');
const io = require('../sockets/socket');

/**
 * @description     Calculate a user's taxes
 * @route           POST /staff/calculate-taxes
 */
const postCalculateTaxes = async (req, res, next) => {
    const userId = req.body.userId;

    try {
        const userTaxDetails = await Tax.findOne({ userId });
        if (!userTaxDetails) {
            const error = new Error('User\'s tax were not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (userTaxDetails.status === 'unpaid') {
            return res.status(200).json({
                message: 'Taxes have already been calculated!',
                userTaxDetails,
            });
        }

        const taxes = taxCalculator.calculateTaxes(userTaxDetails.grossSalary);
        const monthlyNetSalary = taxCalculator
            .calculateMonthlyNetSalary(
                userTaxDetails.grossSalary,
                taxes.totalTaxAmount,
            );

        // TODO: Apply the DES algorithm
        userTaxDetails.tax.socialInsurance = taxes.socialInsurance;
        userTaxDetails.tax.generalHealthSystem = taxes.generalHealthSystem;
        userTaxDetails.tax.incomeTax = taxes.incomeTax;
        userTaxDetails.tax.totalTaxAmount = taxes.totalTaxAmount;
        userTaxDetails.monthlyNetSalary = monthlyNetSalary;
        userTaxDetails.status = 'unpaid';
        const updatedUserTaxDetails = await userTaxDetails.save();

        io.getIO().emit('taxInvoiceNotification', {
            message: 'Your taxes were calculated!',
            amount: userTaxDetails.tax.totalTaxAmount,
        });

        res.status(200).json({
            message: 'Taxes calculated!',
            userTaxDetails: updatedUserTaxDetails,
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
