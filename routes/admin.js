const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

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
    adminController.postCreateUser,
);

module.exports = router;
