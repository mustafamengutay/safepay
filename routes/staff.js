const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middlewares/auth');
const staffController = require('../controllers/staff');

const router = express.Router();

router.post(
    '/calculate-taxes',
    [
        body('userId')
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .notEmpty(),
    ],
    isAuth(['staff']),
    staffController.postCalculateTaxes,
);

// router.patch(
//     '/update-taxes',
//     [
//         body('userId')
//             .trim()
//             .isNumeric()
//             .isLength({ min: 1 })
//             .notEmpty(),

//         body('grossSalary')
//             .trim()
//             .isNumeric()
//             .isLength({ min: 1 })
//             .notEmpty(),
//     ],
//     isAuth(['staff']),
//     staffController.updateTaxes,
// );

module.exports = router;
