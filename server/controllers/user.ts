import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/request';

import UserService from '../services/user';

const userService = UserService.getInstance();

/**
 * @description     Update a user's gross salary
 * @route           PATCH /v1/user/gross-salary
 */
export const updateUserGrossSalary = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { grossSalary } = req.body;

  try {
    const updatedUserTaxDetails = await userService.updateUserGrossSalary(
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
 * @route           GET /v1/user/taxes
 */
export const getTaxes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const userTaxDetails = await userService.getTaxes(userId!);

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
 * @route           POST /v1/user/tax-payment
 */
export const postPayTaxes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const amount = Number(req.body.amount);

  try {
    await userService.payTaxes(userId!, amount);

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
