import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import {
  postCreateAdmin,
  postCreateStaff,
  postCreateUser,
} from '../controllers/admin';

const router = express.Router();

router.post(
  '/create-admin',
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth(['admin']),
  postCreateAdmin
);

router.post(
  '/create-staff',
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth(['admin']),
  postCreateStaff
);

router.post(
  '/create-user',
  [
    body('name').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('surname').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth(['admin']),
  postCreateUser
);

export default router;
