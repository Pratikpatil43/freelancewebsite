import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryMongoServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projectdesk';

    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected successfully');
    } catch (localError) {
      if (process.env.MONGO_URI) {
        throw localError;
      }

      const downloadDir = process.env.MONGOMS_DOWNLOAD_DIR || 'D:\\mongodb-memory-server';
      const systemBinary = process.env.MONGOMS_SYSTEM_BINARY || path.join(downloadDir, 'mongod-x64-win32-7.0.24.exe');

      await fs.mkdir(downloadDir, { recursive: true });
      memoryMongoServer = await MongoMemoryServer.create({
        binary: {
          downloadDir,
          systemBinary,
        },
      });

      await mongoose.connect(memoryMongoServer.getUri());
      console.log('MongoDB connected successfully via in-memory fallback');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  if (memoryMongoServer) {
    await memoryMongoServer.stop();
  }
  process.exit(0);
});

export default connectDB;
