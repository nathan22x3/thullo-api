import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
};
