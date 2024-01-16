import { Column, Entity, ManyToOne } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { ProductEntity } from '~/modules/product/entities/product.entity';

@Entity({ name: 'order_products' })
export class OrderProductEntity extends BasedEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  product: ProductEntity[];
}
