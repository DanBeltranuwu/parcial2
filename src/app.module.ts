import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedSocialModule } from './red-social/red-social.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social/red-social.entity';
import { FotoEntity } from './foto/foto.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { AlbumEntity } from './album/album.entity';

@Module({
  imports: [
    RedSocialModule,
    FotoModule,
    UsuarioModule,
    AlbumModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'socialred',
      entities: [RedSocialEntity, FotoEntity, UsuarioEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
