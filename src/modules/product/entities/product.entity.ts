import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { OrderProductEntity } from '~/modules/order/entities/order-product.entity';
import { OrderEntity } from '~/modules/order/entities/order.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BasedEntity {
  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  category: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn()
  order: OrderEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity;
}
