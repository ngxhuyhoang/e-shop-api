import { Module } from '@nestjs/common';
import { UserService } from './profile.service';
import { UserController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { AccountEntity } from '~/modules/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, AccountEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class ProfileModule {}
