import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/request';

import {
  updateUserGrossSalaryService,
  getTaxesService,
  payTaxesService,
} from '../services/user';

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
    const updatedUserTaxDetails = await updateUserGrossSalaryService(
      userId!,
      grossSalary
    );

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
    const userTaxDetails = await getTaxesService(userId!);

    res.status(200).json(userTaxDetails);
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
    await payTaxesService(userId!, amount);

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
