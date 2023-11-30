import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity])],
  providers: [FotoService]
})
export class FotoModule {}
