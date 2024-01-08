import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { AccountEntity } from '~/modules/account/entities/account.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity extends BasedEntity {
  @Column({ nullable: true })
  displayName?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToOne(() => AccountEntity, ({ profile }) => profile)
  @JoinColumn()
  account: AccountEntity;
}
