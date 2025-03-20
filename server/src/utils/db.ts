import mongoose from 'mongoose';
import logger from './winstonLogger';

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      logger.error('MongoDB URI is missing in environment variables.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      
    });

    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(`MongoDB Connection Error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;