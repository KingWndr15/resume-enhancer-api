require("dotenv").config();
/**
 * Configuration settings for the application, loaded from environment variables.
 */

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  GEMINI_PROMPT: process.env.GEMINI_PROMPT,
};

module.exports = config;
