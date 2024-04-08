const { validationResult } = require('express-validator');

const inputValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error, Please check your inputs!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }
    next();
};

module.exports = inputValidator;
