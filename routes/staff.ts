import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import { Roles } from '../enums/roles';
import { postCalculateTaxes } from '../controllers/staff';

const router = express.Router();

router.post(
  '/tax-calculation',
  [body('userId').trim().isString().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth([Roles.Staff]),
  postCalculateTaxes
);

export default router;
