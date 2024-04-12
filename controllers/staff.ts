import { Request, Response, NextFunction } from 'express';

import { getIO } from '../sockets/socket';
import { calculateTaxesService } from '../services/staff';

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
    const userTaxes = await calculateTaxesService(userId);

    getIO().emit('taxInvoiceNotification', {
      message: 'Taxes calculated!',
      amount: userTaxes.details.tax.totalTaxAmount,
    });

    res.status(200).json({
      message: userTaxes.message,
      userTaxDetails: userTaxes.details,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
