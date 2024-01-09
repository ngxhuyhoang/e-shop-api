import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  productQuantity: number;

  @ApiProperty()
  productImage: string;

  @ApiProperty()
  totalPrice: number;
}
