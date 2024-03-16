const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');

const router = express.Router();

router.patch(
    '/gross-salary',
    [
        body('grossSalary')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    userController.updateUserGrossSalary,
);

module.exports = router;
