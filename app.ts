import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initializeSocket } from './sockets/socket';
import os from 'os';
import cluster from 'cluster';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import errorHandler from './middlewares/error';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import staffRoutes from './routes/staff';
import adminRoutes from './routes/admin';

dotenv.config();

if (cluster.isPrimary) {
  console.log(`Cluster Manager ${process.pid} is running`);

  const numCPUs = os.availableParallelism();
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

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'otps.log'),
    { flags: 'a' }
  );

  app.use(cors());
  app.use(helmet());
  app.use(limiter);
  app.use(bodyParser.json());
  app.use(morgan('tiny', { stream: accessLogStream }));

  app.use('/v1/admin', adminRoutes);
  app.use('/v1/staff', staffRoutes);
  app.use('/v1/user', userRoutes);
  app.use(authRoutes);

  app.use(errorHandler);

  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      const server = app.listen(3000);
      console.log('Server is running!');
      initializeSocket(server).on('connection', () => {
        console.log('Client connected!');
      });
    })
    .catch((error) => {
      console.log('Server Connection Error!');
      console.log(error);
    });
}
