/* eslint-disable prettier/prettier */
import { AlbumEntity } from '../../src/album/album.entity';
import { UsuarioEntity } from '../../src/usuario/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ISO: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: string;

  @ManyToOne(() => AlbumEntity, (album) => album.fotos)
  album: AlbumEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.fotos)
  usuario: UsuarioEntity;
}
