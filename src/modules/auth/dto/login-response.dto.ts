import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { AccountDto } from '~/modules/account/dto/account.dto';
import { ProfileDto } from '~/modules/profile/dto/profile.dto';

export class LoginResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiProperty({ type: AccountDto })
  account: AccountDto;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;
}
