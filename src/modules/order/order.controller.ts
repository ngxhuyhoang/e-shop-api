import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Đơn hàng')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('list')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
