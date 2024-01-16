import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDto } from './product-order.dto';

export class CreateOrderDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty({ isArray: true, type: ProductOrderDto })
  productOrder: ProductOrderDto[];
}
