export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JWTConfig;
};
  
export type AppConfig = {
  port: number;
  host: string;
};

export type DatabaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type JWTConfig = {
  accessSecret: string;
  accessExpiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
};

  