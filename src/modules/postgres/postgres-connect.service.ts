import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import configs from 'src/configs/configs';

dotenv.config();
const config = configs();
const databaseConfig = config.database;

const dataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.dbName,
  entities: ['dist/modules/*/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
});

export default dataSource;
