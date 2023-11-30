import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly redSocialRepository: Repository<RedSocialEntity>,
  ) {}

  async createRedSocial(red: RedSocialEntity): Promise<RedSocialEntity> {
    if (!red.slogan) {
      throw new BusinessLogicException(
        'The red social slogan must exist',
        BusinessError.BAD_REQUEST,
      );
    }
    if (red.slogan.length < 20) {
      throw new BusinessLogicException(
        'The red social slogan must have at least 20 characters',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.redSocialRepository.save(red);
  }
}
