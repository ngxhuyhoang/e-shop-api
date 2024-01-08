import { SnakeNamingStrategy } from '~/databases/snake-naming.strategy';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: Number(this.configService.get<string>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: this.configService.get<string>('NODE_ENV') === 'development',
      extra: { charset: 'utf8mb4_unicode_ci' },
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      migrationsTableName: '__migrations',
      namingStrategy: new SnakeNamingStrategy(),
      // autoLoadEntities: false,
    };
  }
}
