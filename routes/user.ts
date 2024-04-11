import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import {
  getTaxes,
  postPayTaxes,
  updateUserGrossSalary,
} from '../controllers/user';

const router = express.Router();

router.get('/get-taxes', isAuth(['user']), getTaxes);

router.post(
  '/pay-taxes',
  [body('amount').trim().isNumeric().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth(['user']),
  postPayTaxes
);

router.patch(
  '/gross-salary',
  [body('grossSalary').trim().isNumeric().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth(['user']),
  updateUserGrossSalary
);

export default router;
