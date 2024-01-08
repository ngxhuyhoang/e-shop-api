import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Repository } from 'typeorm';
import { JwtClaimDto } from '~/common/jwt-claim.dto';
import { AccountDto } from '~/modules/account/dto/account.dto';
import { AccountEntity } from '~/modules/account/entities/account.entity';
import { ProfileEntity } from '~/modules/profile/entities/profile.entity';
import { ProfileRepository } from '~/modules/profile/profile.repository';
import { ProfileDto } from '../profile/dto/profile.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,

    @InjectRepository(ProfileEntity)
    private readonly _profileRepository: ProfileRepository,

    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>,

    private readonly _configService: ConfigService,
  ) {}

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const existedAccount = await this._accountRepository.findOne({
        where: { email: loginRequestDto.email },
        relations: ['profile'],
      });

      const refreshToken = await this._generateRefreshToken(
        loginRequestDto.email,
      );
      await this._accountRepository.update(existedAccount.id, {
        refreshToken,
      });
      const accessToken: string = await this._accessToken(
        loginRequestDto.email,
        existedAccount.profile.id,
        existedAccount.id,
      );
      const account = await this._accountRepository.findOne({
        where: { email: loginRequestDto.email },
        relations: ['profile'],
      });
      return {
        accessToken,
        refreshToken,
        account: new AccountDto(account),
        profile: new ProfileDto(account.profile),
      };
    } catch (error) {
      throw error;
    }
  }

  private async _register(firebaseUser: DecodedIdToken) {
    try {
      const accountCreatedWithoutRefreshToken =
        await this._accountRepository.save({
          email: firebaseUser.email,
          isVerified: !!firebaseUser.email_verified,
          refreshToken: '',
        });
      await this._profileRepository.save({
        displayName: firebaseUser.name,
        avatar: firebaseUser.picture,
        account: { id: accountCreatedWithoutRefreshToken.id },
      });
      const refreshToken = await this._generateRefreshToken(firebaseUser.email);
      await this._accountRepository.update(
        accountCreatedWithoutRefreshToken.id,
        {
          refreshToken: refreshToken,
        },
      );
      const accountCreated = await this._accountRepository.findOne({
        where: { id: accountCreatedWithoutRefreshToken.id },
        relations: ['profile'],
      });
      return { account: accountCreated, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this._accountRepository.softDelete(id);
      await this._profileRepository.softDelete(id);
      return 'Delete successfully';
    } catch (error) {
      throw error;
    }
  }

  async logout(authUser: JwtClaimDto) {
    try {
      await this._accountRepository.update(authUser.accountId, {
        refreshToken: '',
      });
      return 'success';
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshTokenRequestDto: RefreshTokenRequestDto) {
    try {
      const isValid = await this._jwtService.verifyAsync(
        refreshTokenRequestDto.refreshToken,
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        },
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const existedAccount = await this._accountRepository.findOne({
        where: { refreshToken: refreshTokenRequestDto.refreshToken },
        relations: ['profile'],
      });
      if (!existedAccount) {
        throw new BadRequestException(
          'User not found: ' + refreshTokenRequestDto.refreshToken,
        );
      }
      const accessToken = await this._accessToken(
        existedAccount.email,
        existedAccount.profile.id,
        existedAccount.id,
      );
      return { accessToken: accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async _accessToken(
    email: string,
    profileId: string,
    accountId: string,
  ) {
    try {
      const accessToken: string = await this._jwtService.signAsync({
        accountId,
        profileId,
        email: email,
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  private async _generateRefreshToken(email: string) {
    try {
      const refreshToken = await this._jwtService.signAsync(
        {
          email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      );

      return refreshToken;
    } catch (error) {
      throw error;
    }
  }
}
