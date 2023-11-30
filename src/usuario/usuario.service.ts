import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findAllUsuarios(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find({
      relations: ['red-social', 'foto'],
    });
  }

  async findUsuarioById(id: string): Promise<UsuarioEntity> {
    const user: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['red-social', 'foto'],
    });
    if (!user)
      throw new BusinessLogicException(
        'The user with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return user;
  }
  async createUsuario(user: UsuarioEntity): Promise<UsuarioEntity> {
    if (user.telefono.length != 10) {
      throw new BusinessLogicException(
        'The users phone must have 10 characters',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.usuarioRepository.save(user);
  }
}
