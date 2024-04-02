const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/error');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');
const adminRoutes = require('./routes/admin');

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/staff', staffRoutes);
app.use('/user', userRoutes);
app.use(authRoutes);

app.use(errorHandler.customErrorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Server is running!');
        app.listen(3000);
    })
    .catch(error => {
        console.log('Server Connection Error!');
        console.log(error);
    });
