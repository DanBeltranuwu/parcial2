import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { AlbumEntity } from 'src/album/album.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async findFotoById(id: string): Promise<FotoEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
      relations: ['album', 'usuario'],
    });
    if (!foto)
      throw new BusinessLogicException(
        'The photo with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return foto;
  }

  async findAllFotos(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find({
      relations: ['album', 'usuario'],
    });
  }

  async createFoto(foto: FotoEntity): Promise<FotoEntity> {
    if (foto.ISO < 100 || foto.ISO > 6400) {
      throw new BusinessLogicException(
        'The photo iso must be between 100 and 6400',
        BusinessError.BAD_REQUEST,
      );
    }
    if (foto.velObturacion < 2 || foto.velObturacion > 250) {
      throw new BusinessLogicException(
        'The photo obturation velocity must be between 2 and 250',
        BusinessError.BAD_REQUEST,
      );
    }
    if (foto.apertura < 1 || foto.apertura > 32) {
      throw new BusinessLogicException(
        'The photo aperture must be between 1 and 32',
        BusinessError.BAD_REQUEST,
      );
    }

    
    return await this.fotoRepository.save(foto);
  }

  async deleteFoto(id: string) {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
    });
    if (!foto)
      throw new BusinessLogicException(
        'The photo with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.fotoRepository.remove(foto);
    if (foto.album.fotos.length == 1) {
      await this.albumRepository.remove(foto.album);
    }
  }
}
