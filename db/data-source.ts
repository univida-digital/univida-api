import { configDotenv } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

configDotenv();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;


