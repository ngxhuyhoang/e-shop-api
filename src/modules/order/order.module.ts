import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderProductEntity, ProductEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
