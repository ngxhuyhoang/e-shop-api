import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'hoang@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  confirmPassword: string;

  @ApiProperty({ example: 'Hoang' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Nguyen' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
}
