const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/auth');
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
    isAuth,
    userController.updateUserGrossSalary,
);

module.exports = router;
