import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimDto {
  @ApiProperty()
  profileId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  exp: number;

  @ApiProperty()
  iat: number;
}
