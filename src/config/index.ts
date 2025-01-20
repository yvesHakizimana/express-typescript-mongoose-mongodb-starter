import { config } from 'dotenv'
config({ path: `.env.${process.env.NODE_ENV} || 'development'}.local` })

export const CREDENTIALS = process.env.CREDENTIALS === 'true'
export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = process.env