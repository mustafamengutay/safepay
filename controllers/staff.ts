import { Request, Response, NextFunction } from 'express';
import { CustomValidationError } from '../interfaces/error';

import Tax from '../models/tax';

import { calculateTaxes, calculateMonthlyNetSalary } from '../utils/tax';
import { getIO } from '../sockets/socket';

/**
 * @description     Calculate a user's taxes
 * @route           POST /staff/calculate-taxes
 */
export const postCalculateTaxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  try {
    const userTaxDetails = await Tax.findOne({ userId });
    if (!userTaxDetails) {
      const error = new CustomValidationError(
        404,
        "User's tax were not found."
      );
      return next(error);
    }

    if (userTaxDetails.status === 'unpaid') {
      return res.status(200).json({
        message: 'Taxes have already been calculated!',
        userTaxDetails,
      });
    }

    const taxes = calculateTaxes(userTaxDetails.grossSalary);
    const monthlyNetSalary = calculateMonthlyNetSalary(
      userTaxDetails.grossSalary,
      taxes.totalTaxAmount
    );

    // TODO: Apply the DES algorithm
    userTaxDetails.tax.socialInsurance = taxes.socialInsurance;
    userTaxDetails.tax.generalHealthSystem = taxes.generalHealthSystem;
    userTaxDetails.tax.incomeTax = taxes.incomeTax;
    userTaxDetails.tax.totalTaxAmount = taxes.totalTaxAmount;
    userTaxDetails.monthlyNetSalary = monthlyNetSalary;
    userTaxDetails.status = 'unpaid';
    const updatedUserTaxDetails = await userTaxDetails.save();

    getIO().emit('taxInvoiceNotification', {
      message: 'Your taxes were calculated!',
      amount: userTaxDetails.tax.totalTaxAmount,
    });

    res.status(200).json({
      message: 'Taxes calculated!',
      userTaxDetails: updatedUserTaxDetails,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
