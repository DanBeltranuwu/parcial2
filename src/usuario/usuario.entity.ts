/* eslint-disable prettier/prettier */

import { FotoEntity } from '../../src/foto/foto.entity';
import { RedSocialEntity } from '../../src/red-social/red-social.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @ManyToOne(() => RedSocialEntity, (red) => red.usuarios)
  red: RedSocialEntity;

  @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}
