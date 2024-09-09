import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default registerAs(
  'database',
  (): MongooseModuleOptions => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });
      connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
      });
      return connection;
    },
  }),
);
