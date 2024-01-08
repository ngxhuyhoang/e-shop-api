import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';
import { ProfileEntity } from '~/modules/profile/entities/profile.entity';
import { TaskEntity } from '~/modules/task/entities/task.entity';

@Entity({ name: 'accounts' })
export class AccountEntity extends BasedEntity {
  @Column()
  email: string;

  @Column({ nullable: true, type: 'longtext' })
  refreshToken?: string;

  @OneToOne(() => ProfileEntity, ({ account }) => account)
  profile: ProfileEntity;

  @OneToMany(() => TaskEntity, ({ createdBy }) => createdBy)
  tasks: TaskEntity[];
}
