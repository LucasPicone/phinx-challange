/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_CONNECTION as any,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsRun: false,
  logging: process.env.DB_LOGGING == 'true',
  logger: 'advanced-console',
};

export default new DataSource(dataSourceOptions);
