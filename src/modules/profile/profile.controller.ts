import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtClaimDto } from '~/common/jwt-claim.dto';
import { apiVersion } from '~/constants/version';
import { AuthUser } from '~/decorators/auth-user.decorator';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-user.dto';
import { UserService } from './profile.service';

@Controller({ path: 'profile', version: apiVersion })
@ApiTags('Thông tin cá nhân')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Lấy thông tin người dùng hiện tại',
    type: ProfileDto,
  })
  @ApiOperation({ summary: 'Lấy thông tin user đăng nhập' })
  getCurrentUser(@AuthUser() authUser: JwtClaimDto) {
    return this._userService.getCurrentUser(authUser);
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Cập nhật thông tin người dùng hiện tại',
    type: ProfileDto,
  })
  @ApiOperation({ summary: 'Cập nhật thông tin user đăng nhập' })
  update(
    @AuthUser() authUser: JwtClaimDto,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this._userService.update(authUser, updateProfileDto);
  }
}
