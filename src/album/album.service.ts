import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { FotoEntity } from 'src/foto/foto.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAlbumById(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
      relations: ['foto'],
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return album;
  }

  async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    if (album.titulo.length == 0) {
      throw new BusinessLogicException(
        'The album must have title',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.albumRepository.save(album);
  }

  async deleteAlbum(id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (album.fotos.length > 0)
      throw new BusinessLogicException(
        'The album with the given id must be empty',
        BusinessError.BAD_REQUEST,
      );

    await this.albumRepository.remove(album);
  }

  async addPhotoToAlbum(foto: FotoEntity, id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const fotoFecha = Date.parse(foto.fecha);
    const albumFechaStart = Date.parse(album.fechaInicio);
    const albumFechaEnd = Date.parse(album.fechaFin);

    if (fotoFecha < albumFechaStart || fotoFecha>albumFechaEnd ) {
        throw new BusinessLogicException(
            'The photo must have a valid date',
            BusinessError.BAD_REQUEST,
          );
    }

    album.fotos = [...album.fotos, foto];
    return await this.albumRepository.save(album);
  }
}
