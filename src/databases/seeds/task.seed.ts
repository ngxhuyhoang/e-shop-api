// import { Seeder } from '@jorgebodega/typeorm-seeding';
// import { DataSource } from 'typeorm';
// import { AccountEntity } from '~/modules/account/entities/account.entity';
// import { TaskEntity } from '~/modules/task/entities/task.entity';
// import { TaskFactory } from '../factories/create-task.factory';

// export default class CreateTasks extends Seeder {
//   public async run(dataSource: DataSource): Promise<void> {
//     const account = await dataSource
//       .getRepository(AccountEntity)
//       .findOne({ where: { email: 'hoangnh0099@gmail.com' } });
//     const taskFactory = new TaskFactory(account);
//     const tasks = await taskFactory.makeMany(10);
//     await dataSource.createEntityManager().save<TaskEntity>(tasks);
//   }
// }
