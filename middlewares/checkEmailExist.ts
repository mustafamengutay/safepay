import { Request, Response, NextFunction } from 'express';

import Admin from '../models/admin';
import Staff from '../models/staff';
import User from '../models/user';

import { CustomValidationError } from '../interfaces/error';

const isEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  let isEmailExist = await Admin.findOne({ email });
  if (!isEmailExist) {
    isEmailExist = await Staff.findOne({ email });
  }
  if (!isEmailExist) {
    isEmailExist = await User.findOne({ email });
  }

  if (isEmailExist) {
    const error: CustomValidationError = new CustomValidationError(
      409,
      'Email already exists.'
    );
    return next(error);
  }

  next();
};

export default isEmailExist;
