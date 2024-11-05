import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET_KEY;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRATION;
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRATION || '3d';
export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;