import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { postLogin } from '../controllers/auth';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').trim().isString().notEmpty(),
  ],
  inputValidator,
  postLogin
);

export default router;
