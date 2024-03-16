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

module.exports = router;
