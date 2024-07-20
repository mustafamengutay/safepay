import { Request, Response, NextFunction } from 'express';
import { CustomValidationError } from '../interfaces/error';

import { validationResult } from 'express-validator';

const inputValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomValidationError = new CustomValidationError(
      422,
      'Validation Error, Please check your inputs!',
      errors.array()
    );

    return next(error);
  }
  next();
};

export default inputValidator;
