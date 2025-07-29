export const env = {
  API_URL: process.env.REACT_NATIVE_APP_API_URL || 'http://localhost:3000',
  ENV: process.env.REACT_NATIVE_APP_ENV || 'development',
  VERSION: process.env.REACT_NATIVE_APP_VERSION || '1.0.0',
} as const;

export type Environment = typeof env;

// Type guard for environment variables
export const isValidEnvironmentVariable = (key: keyof Environment): boolean => {
  return env[key] !== undefined && env[key] !== null;
}; 