import dotenv from 'dotenv'

dotenv.config()

type EnvVariables = {
  PORT: string | number
  CORS_ORIGIN: string
  JWT_SECRET: string
  JWT_EXPIRATION: string
}

export const { PORT, CORS_ORIGIN, JWT_SECRET, JWT_EXPIRATION } =
  process.env as EnvVariables
