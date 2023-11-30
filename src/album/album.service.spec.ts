import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.delete(album.id);

    const deletedAlbum: AlbumEntity = await repository.findOne({
      where: { id: album.id },
    });
    expect(deletedAlbum).toBeNull();
  });

  it('delete should throw an exception for an invalid album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.delete(album.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'album',
      'The album with the given id was not found',
    );
  });
});
