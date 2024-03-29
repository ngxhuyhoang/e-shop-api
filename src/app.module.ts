import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '~/databases/type-orm-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60, // 1 day
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production', '.env.staging'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    AccountModule,
    ProfileModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
