const express = require('express');
const { body } = require('express-validator');

const staffController = require('../controllers/staff');

const router = express.Router();

router.post(
    '/calculate-taxes',
    [
        body('grossSalary')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    staffController.postCalculateTaxes,
);

router.patch(
    '/update-taxes',
    [
        body('socialInsurance')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
        body('generalHealthSystem')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
        body('totalTax')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    staffController.updateUserTax,
);

module.exports = router;
