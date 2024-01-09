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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Đơn hàng')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Tạo đơn hàng' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('list')
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Lấy chi tiết đơn hàng' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Cập nhật đơn hàng' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
