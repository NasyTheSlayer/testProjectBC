import { Config } from './configs.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 8080,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  database: {
    port: parseInt(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '8h',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
});