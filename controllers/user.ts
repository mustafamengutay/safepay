import { Request, Response, NextFunction } from 'express';
import { CustomValidationError } from '../interfaces/error';
import { CustomRequest } from '../interfaces/request';

import User from '../models/user';
import Tax from '../models/tax';

/**
 * @description     Update a user's gross salary
 * @route           PATCH /user/gross-salary
 */
export const updateUserGrossSalary = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { grossSalary } = req.body;

  try {
    const userTaxDetails = await Tax.findOne({ userId });
    if (!userTaxDetails) {
      const error = new CustomValidationError(
        404,
        "User's taxes were not found."
      );
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
  } catch (error: any) {
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
export const getTaxes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const userTaxDetails = await Tax.findOne({ userId });
    if (!userTaxDetails) {
      const error = new CustomValidationError(
        404,
        "User's taxes were not found."
      );
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
  } catch (error: any) {
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
export const postPayTaxes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const amount = Number(req.body.amount);

  try {
    const userTaxDetails = await Tax.findOne({ userId });
    if (!userTaxDetails) {
      const error = new CustomValidationError(
        404,
        "User's taxes were not found."
      );
      return next(error);
    }

    if (userTaxDetails.status === 'not calculated') {
      return res.status(200).json({
        message: 'Your taxes have not been calculated yet.',
      });
    }

    if (amount < userTaxDetails.tax.totalTaxAmount) {
      const error = new CustomValidationError(
        404,
        'You do not have enough money to pay your taxes!'
      );
      return next(error);
    } else if (amount > userTaxDetails.tax.totalTaxAmount) {
      const error = new CustomValidationError(
        404,
        'You entered more than your tax fee.'
      );
      return next(error);
    } else if (amount === 0) {
      const error = new CustomValidationError(404, 'You tried to pay 0 Euros.');
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
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
