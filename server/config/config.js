// server/config/config.js
import dotenv from 'dotenv';

dotenv.config();

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;