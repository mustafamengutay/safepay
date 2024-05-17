import { Request, Response, NextFunction } from 'express';

import {
  createAdminService,
  createStaffService,
  createUserService,
} from '../services/admin';

/**
 * @description     Create an admin
 * @route           POST /v1/admin/admin
 */
export const postCreateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const admin = await createAdminService(email, password);

    res.status(201).json({
      message: 'Admin created successfully!',
      admin,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * @description     Create a staff
 * @route           POST /v1/admin/staff
 */
export const postCreateStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const staff = await createStaffService(email, password);

    res.status(201).json({
      message: 'Staff created successfully!',
      staff,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * @description     Create a user
 * @route           POST /v1/admin/user
 */
export const postCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname, email, password } = req.body;

  try {
    const user = await createUserService(name, surname, email, password);

    res.status(201).json({
      message: 'User created successfully!',
      user,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
