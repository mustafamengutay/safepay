import { ValidationError } from 'express-validator';

export class CustomValidationError extends Error {
  statusCode: number;
  array?: ValidationError[];
  constructor(statusCode: number, message?: string, array?: ValidationError[]) {
    super(message);
    this.statusCode = statusCode;
    this.array = array;
  }
}
