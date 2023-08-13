import { Test, TestingModule } from '@nestjs/testing';
import { MajorsService } from './majors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Major } from './entities/major.entity';
import { Repository } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';

const mockMajorRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MajorsService', () => {
  let service: MajorsService;
  let MajorsRepository: MockRepository<Major>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MajorsService,
        {
          provide: getRepositoryToken(Major),
          useValue: mockMajorRepository(),
        },
      ],
    }).compile();

    service = module.get<MajorsService>(MajorsService);
    MajorsRepository = module.get<MockRepository<Major>>(
      getRepositoryToken(Major),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of majors', async () => {
      MajorsRepository.find.mockResolvedValue(ITEMS); //find 메소드를 사용하면 ITEMS를 반환하도록 설정
      const result = await service.findAll();
      expect(result).toEqual(ITEMS);
    });
  });

  describe('findOne()', () => {
    it('should return a major', async () => {
      MajorsRepository.findOne.mockResolvedValue(ITEMS[0]); //findOne 메소드를 사용하면 ITEMS[0]을 반환하도록 설정
      const result = await service.findOne('기계공학과');
      expect(result).toEqual(ITEMS[0]);
    });
    it('should return 404', async () => {
      MajorsRepository.findOne.mockResolvedValue(undefined);
      try {
        await service.findOne('기계공학과');
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
  });

  describe('create()', () => {
    const createMajorDto: CreateMajorDto = {
      majorName: '기계공학과',
    };
    it('should create a major', async () => {
      MajorsRepository.save.mockResolvedValue(createMajorDto); //성공할꺼라 가정.
      const result = await service.create(createMajorDto);

      expect(MajorsRepository.create).toHaveBeenCalledTimes(1); // create가 1번 불러졌니?
      expect(MajorsRepository.create).toHaveBeenCalledWith(createMajorDto); // 매개변수로 createArgs가 주어졌니?
      expect(result).toEqual(createMajorDto); // 반환값이 createArgs와 같니?
    });

    it('should fail on exception', async () => {
      MajorsRepository.save.mockRejectedValue('save Error'); //실패할꺼라 가정.
      try {
        await service.create(createMajorDto);
      } catch (e) {
        expect(e).toEqual('save Error');
      }
    });
  });
});

const ITEMS: Major[] = [
  {
    majorName: '기계공학과',
    departmentName: '공과대학',
    insertDay: new Date(),
    modifyDay: new Date(),
  },
  {
    majorName: '전자공학과',
    departmentName: '공과대학',
    insertDay: new Date(),
    modifyDay: new Date(),
  },
];
