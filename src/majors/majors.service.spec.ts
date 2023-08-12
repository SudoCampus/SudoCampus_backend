import { Test, TestingModule } from '@nestjs/testing';
import { MajorsService } from './majors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Major } from './entities/major.entity';

describe('MajorsService', () => {
  let service: MajorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MajorsService],
    }).compile();

    service = module.get<MajorsService>(MajorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of majors', async () => {
      expect(service.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('findOne()', () => {
    service.create({ majorName: 'test' });
    it('should return a major', async () => {
      expect(service.findOne('test')).toBeDefined();
    });
    service.remove('test');
    it('should return 404', async () => {
      try {
        expect(service.findOne('test'));
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
  });

  describe('create()', () => {
    it('should create a major', async () => {
      const beforeCreate: number = await service
        .findAll()
        .then((majors) => majors.length);
      expect(service.create({ majorName: 'test' })).toBeDefined();
      const afterCreate: number = await service
        .findAll()
        .then((majors) => majors.length);
      expect(afterCreate).toBe(beforeCreate + 1);
      service.remove('test');
    });
  });

  describe('update()', () => {
    it('should update a major', async () => {
      service.create({ majorName: 'test' });
      expect(
        service.update('test', { majorName: 'test2' }),
      ).resolves.toBeDefined();
      service.remove('test2');
    });
  });

  describe('remove()', () => {
    it('should remove a major', async () => {
      service.create({ majorName: 'test' });
      const beforeRemove: number = await service
        .findAll()
        .then((majors) => majors.length);
      expect(service.remove('test')).resolves.toBeDefined();
      const afterRemove: number = await service
        .findAll()
        .then((majors) => majors.length);
      expect(afterRemove).toBe(beforeRemove - 1);
    });
  });
});
