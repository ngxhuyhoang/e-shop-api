import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const dataSource = new DataSource({
  // driver: 'mysql',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: true,
  extra: { charset: 'utf8mb4_unicode_ci' },
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
  logging: true,
  migrationsTableName: '__migrations',
  namingStrategy: new SnakeNamingStrategy(),
  // autoLoadEntities: false,
});

dataSource
  .initialize()
  .then(() => {
    console.info('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.info('Error during Data Source initialization', error);
  });

export default dataSource;
