import { Request, Response, NextFunction } from 'express';

import { getIO } from '../sockets/socket';
import StaffService from '../services/staff';

const staffService = new StaffService();

/**
 * @description     Calculate a user's taxes
 * @route           POST /v1/staff/tax-calculation
 */
export const postCalculateTaxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  try {
    const userTaxes = await staffService.calculateTaxes(userId);

    getIO().emit('taxInvoiceNotification', {
      message: 'Taxes calculated!',
      amount: userTaxes.details.tax.totalTaxAmount,
    });

    res.status(200).json({
      message: userTaxes.message,
      userTaxDetails: userTaxes.details,
      signature: userTaxes.signature,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * @description     Lists all taxes which are `not calculated`
 * @route           POST /v1/staff/taxes
 */
export const getAllTaxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taxList = await staffService.listTaxes();

    res.status(200).json({
      message: taxList.message,
      taxes: taxList.list,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
