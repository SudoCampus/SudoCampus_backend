import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserBasicInfoDto } from './dto/read-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { Major } from 'src/majors/entities/major.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExceptionHandler } from 'src/utils/exceptionHandler';
import { BcryptHanlder } from 'src/utils/BcryptHandler';
import SuccessHanlder from 'src/utils/SuccessHandler';
import {
  CreateResponse,
  ReadAllWithPaginationResponse,
} from 'src/utils/SuccessHandler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private MAJOR: string = '학과';
  private STUDENT_NUMBER: string = '학번';
  private USER_ID: string = '아이디';
  private USER: string = '유저';
  private INVALID_FOREIGN_KEY_CODE: number = 1452;

  async create(createUserDto: CreateUserDto): Promise<CreateResponse<User>> {
    const userByUserId = await this.findByUserId(createUserDto.userId);
    if (userByUserId) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.USER_ID,
        createUserDto.userId,
      );
    }
    const userByStudentNumber = await this.findByStudentNumber(
      createUserDto.studentNumber,
    );
    if (userByStudentNumber) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.STUDENT_NUMBER,
        createUserDto.studentNumber.toString(),
      );
    }
    try {
      createUserDto.userPw = await BcryptHanlder.hashPassword(
        createUserDto.userPw,
      );
      const user: User = await this.userRepository.save(createUserDto);
      return SuccessHanlder.getCreateSuccessResponse(user, this.USER);
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        CreateExceptionHandler.throwInvalidForeignKeyException(
          this.MAJOR,
          createUserDto.majorName,
        );
      } else {
        throw error;
      }
    }
  }

  async findAll(
    page: number,
    per_page: number,
  ): Promise<ReadAllWithPaginationResponse<ReadUserBasicInfoDto>> {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.major', 'major')
      .select([
        'user.studentNumber',
        'user.userId',
        'user.userName',
        'user.userSemester',
        'user.userGpaAll',
        'user.userGpaGroup',
        'user.majorName',
        'major.departmentName',
      ])
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    const readUserDtos: ReadUserBasicInfoDto[] = users.map((user) => ({
      studentNumber: user.studentNumber,
      userId: user.userId,
      userName: user.userName,
      userSemester: user.userSemester,
      userGpaAll: user.userGpaAll,
      userGpaGroup: user.userGpaGroup,
      majorName: user.majorName,
      departmentName: user.major.departmentName,
    }));

    const totalPages = Math.ceil(total / per_page);

    return SuccessHanlder.getReadAllWithPaginationSuccessResponse(
      readUserDtos,
      this.USER,
      page,
      per_page,
      totalPages,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUserId(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async findByStudentNumber(studentNumber: number): Promise<User> {
    return await this.userRepository.findOne({ where: { studentNumber } });
  }
}
