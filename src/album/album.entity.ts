/* eslint-disable prettier/prettier */
import { FotoEntity } from 'src/foto/foto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 fechaFin: string;
 
 @Column()
 titulo: string;

 @OneToMany(() => FotoEntity, (foto) => foto.album)
  fotos: FotoEntity[];
}