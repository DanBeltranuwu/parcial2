import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      id: '',
      ISO: 250,
      velObturacion: 250,
      apertura: 25,
      fecha: faker.date.soon().toString(),
      album: null,
      usuario: null,
    };

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.ISO).toEqual(newFoto.ISO);
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion);
  });

  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      id: '0',
      ISO: 7000,
      velObturacion: 250,
      apertura: 25,
      fecha: faker.date.soon().toString(),
      album: null,
      usuario: null,
    };

    await service.createFoto(foto);
    await expect(() => service.createFoto(foto)).rejects.toHaveProperty(
      'foto',
      'The photo iso must be between 100 and 6400',
    );
  });

  it('delete should remove a foto', async () => {
    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: '0' },
    });
    await service.deleteFoto(storedFoto.id);

    const deletedFoto: FotoEntity = await repository.findOne({
      where: { id: storedFoto.id },
    });
    expect(deletedFoto).toBeNull();
  });

  it('delete should throw an exception for an invalid foto', async () => {
    await service.deleteFoto('10');
    await expect(() => service.deleteFoto('10')).rejects.toHaveProperty(
      'foto',
      'The photo with the given id was not found',
    );
  });
});
