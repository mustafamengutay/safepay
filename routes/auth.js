const express = require('express');
const { body } = require('express-validator');
const inputValidator = require('../middlewares/inputValidator');

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
    inputValidator,
    authController.postLogin,
);

module.exports = router;