import dotenv from "dotenv";

dotenv.config();

type EnvVariables = {
  PORT: string | number;
  CORS_ORIGIN: string;
  GOOGLE_DRIVE_KEY_FILE_NAME: string;
};

export const {
  PORT,
  CORS_ORIGIN,
  GOOGLE_DRIVE_KEY_FILE_NAME,
} = process.env as EnvVariables;
