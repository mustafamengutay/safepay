import express from 'express';
import { body } from 'express-validator';
import inputValidator from '../middlewares/inputValidator';

import { isAuth } from '../middlewares/auth';
import {
  postCreateAdmin,
  postCreateStaff,
  postCreateUser,
} from '../controllers/admin';
import { Roles } from '../enums/roles';

const router = express.Router();

router.post(
  '/admin',
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth([Roles.Admin]),
  postCreateAdmin
);

router.post(
  '/staff',
  [
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth([Roles.Admin]),
  postCreateStaff
);

router.post(
  '/user',
  [
    body('name').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('surname').trim().isString().isLength({ min: 3 }).notEmpty(),
    body('email').trim().isEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty(),
  ],
  inputValidator,
  isAuth([Roles.Admin]),
  postCreateUser
);

export default router;
