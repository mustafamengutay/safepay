const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    /**
     * Expected form of the token
     * {
      headers: {
        'Authorization': token,
      },
     */

    const token = req.get('Authorization');
    if (!token) {
        const error = new Error('The `Authorization` header contains the token was not set.');
        error.statusCode = 401;
        throw error;
    }

    // Verify the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'cmpe455supersecret');
    } catch (error) {
        console.log('Token could not be decoded!');
        err.statusCode = 500;
        throw error;
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};

module.exports = isAuth;
