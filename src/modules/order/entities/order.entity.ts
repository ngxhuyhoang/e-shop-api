import { Column, Entity } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BasedEntity {
  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  productId: string;

  @Column()
  productQuantity: number;

  @Column()
  productImage: string;

  @Column()
  totalPrice: number;
}
