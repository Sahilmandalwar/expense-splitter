import dotenv from "dotenv";
dotenv.config();

const ENV = process.env;

export const env = {
    DATABASE_URL : ENV.DATABASE_URL,
    PORT : ENV.PORT,
    BCRYPT_SALT_ROUNDS: ENV.BCRYPT_SALT_ROUNDS,
    JWT_SECRET: ENV.JWT_SECRET,
    NODE_ENV: ENV.NODE_ENV,
    DEFAULT_LIMIT: ENV.DEFAULT_LIMIT
}
