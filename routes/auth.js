const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/login',
    [
        body('email')
            .trim()
            .isEmail()
            .notEmpty(),
        body('password')
            .trim()
            .isString()
            .notEmpty(),
    ],
    authController.postLogin,
);

module.exports = router;