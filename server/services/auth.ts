import { CustomValidationError } from '../interfaces/error';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../models/admin';
import Staff from '../models/staff';
import User from '../models/user';

export default class LoginService {
  private static instance: LoginService;

  private constructor() {}

  static getInstance() {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
    }

    return LoginService.instance;
  }

  login = async (email: string, password: string) => {
    let user = await User.findOne({ email });
    if (!user) {
      user = await Staff.findOne({ email });
    }
    if (!user) {
      user = await Admin.findOne({ email });
    }
    if (!user) {
      throw new CustomValidationError(
        401,
        'A user with this email could not be found.'
      );
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new CustomValidationError(401, 'Wrong password.');
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

    return {
      token,
      userId: user._id.toString(),
      userRole: user.role,
    };
  };
}
