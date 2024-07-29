import dotenv from 'dotenv'

dotenv.config()

type EnvVariables = {
  PORT: string | number
  CORS_ORIGIN: string
  JWT_SECRET: string
  JWT_EXPIRATION: string
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
}

export const {
  PORT,
  CORS_ORIGIN,
  JWT_SECRET,
  JWT_EXPIRATION,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} = process.env as EnvVariables
