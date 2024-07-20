import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import {
  getTaxes,
  postPayTaxes,
  updateUserGrossSalary,
} from '../controllers/user';
import { Roles } from '../enums/roles';

const router = express.Router();

router.get('/taxes', isAuth([Roles.User]), getTaxes);

router.post(
  '/tax-payment',
  [body('amount').trim().isNumeric().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth([Roles.User]),
  postPayTaxes
);

router.patch(
  '/gross-salary',
  [body('grossSalary').trim().isNumeric().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth([Roles.User]),
  updateUserGrossSalary
);

export default router;
