import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { JwtClaimDto } from '~/common/jwt-claim.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly _orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly _orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ProductEntity)
    private readonly _productRepository: Repository<ProductEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto, authUser: JwtClaimDto) {
    try {
      const productOrder = await createOrderDto.productOrder.map((p) => {
        return {
          name: p.name,
          price: p.price,
          image: p.image,
          quantity: p.quantity,
          totalPrice: p.totalPrice,
          productId: p.productId,
        };
      });
      return await this._orderRepository.save({
        ...createOrderDto,
        productOrder: productOrder,
        accountId: authUser.accountId,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const orders = await this._orderRepository.find();
      return orders;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this._orderRepository.save(updateOrderDto);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const order = await this._orderRepository.softDelete(id);
      return order;
    } catch (error) {
      throw error;
    }
  }
}
