import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtClaimDto } from '~/common/jwt-claim.dto';
import { apiVersion } from '~/constants/version';
import { AuthUser } from '~/decorators/auth-user.decorator';
import { Auth } from '~/decorators/auth.decorator';
import { Public } from '~/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller({ path: 'auth', version: apiVersion })
@ApiTags('Xác thực người dùng')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Đăng nhập' })
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this._authService.login(loginRequestDto);
  }

  @Post('refresh-token')
  @Public()
  @ApiOperation({ summary: 'Lấy refresh token' })
  refreshToken(@Body() refreshTokenDto: RefreshTokenRequestDto) {
    return this._authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @Auth()
  @ApiOperation({ summary: 'Đăng xuất' })
  async logout(@AuthUser() authUser: JwtClaimDto) {
    return await this._authService.logout(authUser);
  }

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Đăng ký' })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this._authService.register(registerRequestDto);
  }
}
