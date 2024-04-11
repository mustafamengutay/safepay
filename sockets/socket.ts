import { Server } from 'http';
import { Server as IOServer } from 'socket.io';

let io: IOServer;

export const initializeSocket = (httpServer: Server) => {
  io = new IOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
