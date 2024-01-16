import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  productId: string;
}
