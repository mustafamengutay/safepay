const express = require('express');
const { body } = require('express-validator');
const inputValidator = require('../middlewares/inputValidator');

const isAuth = require('../middlewares/auth');
const staffController = require('../controllers/staff');

const router = express.Router();

router.post(
    '/calculate-taxes',
    [
        body('userId')
            .trim()
            .isString()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    inputValidator,
    isAuth(['staff']),
    staffController.postCalculateTaxes,
);

module.exports = router;
