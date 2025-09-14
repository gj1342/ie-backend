export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  HOST: process.env.HOST || '0.0.0.0',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
  MISTRAL_API_URL: process.env.MISTRAL_API_URL || 'https://api.mistral.ai/v1',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  MONGO_URI: process.env.MONGO_URI || '',
};