const customErrorHandler = (error, req, res, next) => {
    console.log('Custom Error Handler');
    console.log(error);

    const statusCode = error.statusCode || 500;
    const message = error.message;
    const errors = error.array;

    res.status(statusCode).json({
        message,
        errors,
    });
};

module.exports = {
    customErrorHandler,
};
