import * as mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export const connect = () => {
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connection open');
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose connection disconnected');
  });

  mongoose.connection.on('SIGKILL', () => {
    logger.info('Mongoose connection closed on termination');
    mongoose.disconnect();
  });

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};
