const { validationResult } = require('express-validator');

const User = require('../models/user');
const Tax = require('../models/tax');

/**
 * @description     Update a user's gross salary
 * @route           PATCH /user/gross-salary
 */
const updateUserGrossSalary = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }

    const userId = req.userId;
    const grossSalary = req.body.grossSalary;

    try {
        const userTaxDetails = await Tax.findOne({ userId });
        if (!userTaxDetails) {
            const error = new Error('User\'s taxes were not found.');
            error.statusCode = 404;
            return next(error);
        }

        // TODO: Apply the DES algorithm
        userTaxDetails.grossSalary = grossSalary;
        userTaxDetails.tax.socialInsurance = 0;
        userTaxDetails.tax.generalHealthSystem = 0;
        userTaxDetails.tax.incomeTax = 0;
        userTaxDetails.tax.totalTaxAmount = 0;
        userTaxDetails.monthlyNetSalary = 0;
        userTaxDetails.status = 'not calculated';
        const updatedUserTaxDetails = await userTaxDetails.save();

        res.status(200).json({
            message: 'Gross salary updated!',
            userTaxDetails: updatedUserTaxDetails,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }

    const userId = req.userId;

    try {
        const userTaxDetails = await Tax.findOne({ userId });
        if (!userTaxDetails) {
            const error = new Error('User\'s taxes were not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (userTaxDetails.status === 'not calculated') {
            return res.status(200).json({
                message: 'Your taxes have not been calculated yet.',
            });
        } else if (userTaxDetails.status === 'paid') {
            return res.status(200).json({
                message: 'You have already paid your taxes.',
            });
        }

        res.status(200).json({
            message: `User's taxes were fetched successfully!`,
            status: userTaxDetails.status,
            taxes: userTaxDetails.tax,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }

    const userId = req.userId;
    const amount = Number(req.body.amount);

    try {
        const userTaxDetails = await Tax.findOne({ userId });
        if (!userTaxDetails) {
            const error = new Error('User\'s taxes were not found.');
            error.statusCode = 404;
            return next(error);
        }

        if (userTaxDetails.status === 'not calculated') {
            return res.status(200).json({
                message: 'Your taxes have not been calculated yet.',
            });
        }

        if (amount < userTaxDetails.tax.totalTaxAmount) {
            const error = new Error('You do not have enough money to pay your taxes!');
            error.statusCode = 404;
            return next(error);
        } else if (amount > userTaxDetails.tax.totalTaxAmount) {
            const error = new Error('You entered more than your tax fee.');
            error.statusCode = 404;
            return next(error);
        } else if (amount === 0) {
            const error = new Error('You tried to pay 0 Euros.');
            error.statusCode = 404;
            return next(error);
        }

        userTaxDetails.tax.totalTaxAmount -= amount;
        userTaxDetails.tax.socialInsurance = 0;
        userTaxDetails.tax.generalHealthSystem = 0;
        userTaxDetails.tax.incomeTax = 0;
        userTaxDetails.monthlyNetSalary = 0;
        userTaxDetails.status = 'paid';
        const updatedUserTaxDetails = await userTaxDetails.save();

        res.status(200).json({
            message: 'Your taxes were successfully paid!',
            netSalary: updatedUserTaxDetails.monthlyNetSalary,
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
