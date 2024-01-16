import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { OrderEntity } from '~/modules/order/entities/order.entity';
import { ProfileEntity } from '~/modules/profile/entities/profile.entity';

@Entity({ name: 'accounts' })
export class AccountEntity extends BasedEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'longtext' })
  refreshToken?: string;

  @OneToOne(() => ProfileEntity, ({ account }) => account)
  profile: ProfileEntity;

  @OneToMany(() => OrderEntity, (order) => order.account)
  orders: OrderEntity[];
}
