import { Request, Response, NextFunction } from 'express';

import LoginService from '../services/auth';

const loginService = new LoginService();

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
    const loginDetails = await loginService.login(email, password);

    res.status(200).json({
      message: 'Login successful!',
      token: loginDetails.token,
      userId: loginDetails.userId,
      userRole: loginDetails.userRole,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
