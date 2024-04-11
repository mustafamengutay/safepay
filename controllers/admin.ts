import { Request, Response, NextFunction } from 'express';

import bcrypt from 'bcryptjs';

import User from '../models/user';
import Staff from '../models/staff';
import Admin from '../models/admin';
import Tax from '../models/tax';

/**
 * @description     Create an admin
 * @route           POST /admin/create-admin
 */
export const postCreateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const password: string = await bcrypt.hash(req.body.password, 12);

    const newAdmin = new Admin({
      email,
      password,
    });
    const admin = await newAdmin.save();

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
 * @route           POST /admin/create-staff
 */
export const postCreateStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const password: string = await bcrypt.hash(req.body.password, 12);

    const newStaff = new Staff({
      email,
      password,
    });
    const staff = await newStaff.save();

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
 * @route           POST /admin/create-user
 */
export const postCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname, email } = req.body;

  try {
    const password: string = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      name,
      surname,
      email,
      password,
    });
    const userTax = new Tax({ userId: newUser._id });

    const user = await newUser.save();
    await userTax.save();

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
