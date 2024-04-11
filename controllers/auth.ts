import { Request, Response, NextFunction } from 'express';
import { CustomValidationError } from '../interfaces/error';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import Staff from '../models/staff';
import Admin from '../models/admin';

/**
 * @description     Login to the system as a user
 * @route           POST /login
 */
export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await Staff.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      const error: CustomValidationError = new CustomValidationError(
        401,
        'A user with this email could not be found.'
      );
      return next(error);
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      const error: CustomValidationError = new CustomValidationError(
        401,
        'Wrong password.'
      );
      return next(error);
    }

    const token: string = jwt.sign(
      {
        email: user.email,
        userRole: user.role,
        userId: user._id.toString(),
      },
      'cmpe455supersecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token: token,
      userId: user._id.toString(),
      userRole: user.role,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
