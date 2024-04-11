import { Request, Response, NextFunction } from 'express';
import { CustomValidationError } from '../interfaces/error';

const customErrorHandler = (
  error: CustomValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Custom Error Handler');
  console.log(error);

  const statusCode = error.statusCode || 500;
  const message = error.message;
  const errors = error.array;

  res.status(statusCode).json({
    message,
    errors,
  });
};

export default customErrorHandler;
