import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import { postCalculateTaxes } from '../controllers/staff';

const router = express.Router();

router.post(
  '/calculate-taxes',
  [body('userId').trim().isString().isLength({ min: 1 }).notEmpty()],
  inputValidator,
  isAuth(['staff']),
  postCalculateTaxes
);

export default router;
