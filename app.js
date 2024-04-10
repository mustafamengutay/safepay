const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const io = require('./sockets/socket');
const numCPUs = require('os').availableParallelism();
const cluster = require('cluster');

const errorHandler = require('./middlewares/error');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const staffRoutes = require('./routes/staff');
const adminRoutes = require('./routes/admin');

if (cluster.isPrimary) {
    console.log(`Cluster Manager ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = express();

    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        limit: 100,
        message: 'Too many requests!',
        legacyHeaders: false,
        standardHeaders: 'draft-7',
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
            const server = app.listen(3000);
            console.log('Server is running!');
            io.initializeSocket(server).on('connection', () => {
                console.log('Client connected!');
            });
        })
        .catch(error => {
            console.log('Server Connection Error!');
            console.log(error);
        });
}
