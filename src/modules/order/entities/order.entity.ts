import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { AccountEntity } from '~/modules/account/entities/account.entity';
import { ProductEntity } from '~/modules/product/entities/product.entity';

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

  @OneToMany(() => ProductEntity, (product) => product.order)
  products: ProductEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.orders)
  @JoinColumn()
  account: AccountEntity;
}
