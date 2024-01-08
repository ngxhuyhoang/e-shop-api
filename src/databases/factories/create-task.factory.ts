import { faker } from '@faker-js/faker';
import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { AccountEntity } from '~/modules/account/entities/account.entity';
import { TaskEntity } from '~/modules/task/entities/task.entity';
import dataSource from '../data-source';

export class TaskFactory extends Factory<TaskEntity> {
  protected entity = TaskEntity;
  protected dataSource = dataSource;

  constructor(private readonly account: AccountEntity) {
    super();
  }

  protected attrs(): FactorizedAttrs<TaskEntity> {
    return {
      title: faker.person.firstName,
      description: faker.lorem.paragraph,
      // completed: faker.datatype.boolean,
    };
  }
}
