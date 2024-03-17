const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/auth');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post(
    '/create-admin',
    [
        body('email')
            .trim()
            .isEmail()
            .notEmpty(),
        body('password')
            .isLength({ min: 6 })
            .notEmpty(),
    ],
    isAuth(['admin']),
    adminController.postCreateAdmin,
);

router.post(
    '/create-user',
    [
        body('name')
            .trim()
            .isString()
            .isLength({ min: 3 })
            .notEmpty(),
        body('surname')
            .trim()
            .isString()
            .isLength({ min: 3 })
            .notEmpty(),
        body('email')
            .trim()
            .isEmail()
            .notEmpty(),
        body('password')
            .isLength({ min: 6 })
            .notEmpty(),
    ],
    isAuth(['admin']),
    adminController.postCreateUser,
);

module.exports = router;
