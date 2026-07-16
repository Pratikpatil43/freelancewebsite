import mongoose from 'mongoose';

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    try {
      const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projectdesk';
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
      console.log('MongoDB connected successfully');
    return mongoose.connection;
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      throw error;
    }
  })();

  try {
    return await connectionPromise;
  } finally {
    connectionPromise = undefined;
  }
};

export default connectDB;
