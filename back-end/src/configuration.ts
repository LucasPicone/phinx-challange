export default () => ({
  port: parseInt(process.env.PORT!, 10) ?? 8100,
  nodeEnv: process.env.NODE_ENV,
  database: {
    type: process.env.DB_CONNECTION as unknown,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_DATABASE,
    entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    migrationsRun: false,
    logging: process.env.DB_LOGGING == 'true',
    logger: 'advanced-console',
  },
});
