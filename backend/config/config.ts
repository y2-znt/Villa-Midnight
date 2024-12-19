import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;
export const SALT_ROUNDS = 10;
export const TOKEN_EXPIRY = "1h";
