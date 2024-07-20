import express from 'express';
import { body } from 'express-validator';

import { isAuth } from '../middlewares/auth';
import inputValidator from '../middlewares/inputValidator';
import isEmailExist from '../middlewares/checkEmailExist';

import {
  postCreateAdmin,
  postCreateStaff,
  postCreateUser,
} from '../controllers/admin';

import { Roles } from '../enums/roles';

const router = express.Router();

router.post(
  '/admin',
  isAuth([Roles.Admin]),
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isEmailExist,
  postCreateAdmin
);

router.post(
  '/staff',
  isAuth([Roles.Admin]),
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isEmailExist,
  postCreateStaff
);

router.post(
  '/user',
  isAuth([Roles.Admin]),
  [
    body('name').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('surname').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isEmailExist,
  postCreateUser
);

export default router;
