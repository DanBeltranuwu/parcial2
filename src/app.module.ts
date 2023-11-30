import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedSocialModule } from './red-social/red-social.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [RedSocialModule, FotoModule, UsuarioModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
