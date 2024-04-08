const express = require('express');
const { body } = require('express-validator');
const inputValidator = require('../middlewares/inputValidator');

const isAuth = require('../middlewares/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-taxes', isAuth(['user']), userController.getTaxes);

router.post(
    '/pay-taxes',
    [
        body('amount')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    inputValidator,
    isAuth(['user']),
    userController.postPayTaxes,
);

router.patch(
    '/gross-salary',
    [
        body('grossSalary')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    inputValidator,
    isAuth(['user']),
    userController.updateUserGrossSalary,
);

module.exports = router;
