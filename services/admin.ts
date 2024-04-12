import bcrypt from 'bcryptjs';

import Admin from '../models/admin';
import Staff from '../models/staff';
import User from '../models/user';
import Tax from '../models/tax';

export const createAdminService = async (email: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 12);

  const newAdmin = new Admin({
    email,
    password: hashedPassword,
  });
  return await newAdmin.save();
};

export const createStaffService = async (email: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 12);

  const newStaff = new Staff({
    email,
    password: hashedPassword,
  });
  return await newStaff.save();
};

export const createUserService = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  const hashedPassword: string = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    surname,
    email,
    password: hashedPassword,
  });
  const userTax = new Tax({ userId: newUser._id });
  await userTax.save();

  return await newUser.save();
};
