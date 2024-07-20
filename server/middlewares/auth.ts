import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/request';
import { CustomValidationError } from '../interfaces/error';

import jwt from 'jsonwebtoken';

interface JwtPayload extends jwt.JwtPayload {
  userId?: string;
  userRole?: string;
}

export const isAuth = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    /**
         * Expected form of the token
         * {
          headers: {
            'Authorization': token,
          },
         */

    const token = req.get('Authorization');
    if (!token) {
      const error = new CustomValidationError(
        401,
        'The `Authorization` header contains the token was not set.'
      );
      throw error;
    }

    // Verify the token
    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, 'cmpe455supersecret') as JwtPayload;
    } catch (error: any) {
      console.log('Token could not be decoded!');
      error.statusCode = 500;
      throw error;
    }

    if (!decodedToken) {
      const error = new CustomValidationError(401, 'Not authenticated.');
      throw error;
    }

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;

    if (!roles.includes(req.userRole!)) {
      const error = new CustomValidationError(403, 'Unauthorized access.');
      throw error;
    }
    next();
  };
};
