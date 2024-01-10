import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';
import { BasedDto } from '~/common/based.dto';

export class ProfileDto extends BasedDto {
  @ApiProperty()
  displayName?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  email: string;

  constructor(user: ProfileEntity) {
    super(user);

    this.id = user.id;
    this.displayName = user.displayName;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
