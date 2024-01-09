import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly _orderRepository: Repository<OrderEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this._orderRepository.save(createOrderDto);
      return order;
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
