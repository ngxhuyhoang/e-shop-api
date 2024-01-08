import { BasedDto } from '~/common/based.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../entities/account.entity';

export class AccountDto extends BasedDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isVerified: boolean;

  constructor(entity: AccountEntity) {
    super(entity);
    this.email = entity.email;
  }
}
