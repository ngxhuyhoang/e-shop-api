import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

export class ProfileRepository extends Repository<ProfileEntity> {}
