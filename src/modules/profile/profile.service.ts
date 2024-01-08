import { JwtClaimDto } from '~/common/jwt-claim.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from './dto/update-user.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly _profileRepository: ProfileRepository,
  ) {}

  async update(authUser: JwtClaimDto, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this._profileRepository.findOne({
        where: { id: authUser.profileId },
        relations: ['account'],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      await this._profileRepository.update(
        authUser.profileId,
        updateProfileDto,
      );
      return new ProfileDto(user);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(authUser: JwtClaimDto) {
    try {
      const user = await this._profileRepository.findOne({
        where: { account: { email: authUser.email } },
        relations: ['account'],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return new ProfileDto(user);
    } catch (error) {
      throw error;
    }
  }
}
