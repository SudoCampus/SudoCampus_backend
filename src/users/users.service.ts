import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateExceptionHandler,
  ReadExceptionHandler,
  DeleteExceptionHandler,
  CommonExceptionHandler,
  UpdateExceptionHandler,
} from 'src/utils/exceptionHandler';
import { BcryptHanlder } from 'src/utils/BcryptHandler';
import SuccessHanlder, { ReadOneResponse } from 'src/utils/SuccessHandler';
import {
  CreateResponse,
  ReadAllWithPaginationResponse,
} from 'src/utils/SuccessHandler';
import { UserResponseType } from './dto/read-user.dto';
import {
  GetAllUsers,
  GetUserById,
  GetUserByStudentNumber,
} from 'src/queries/user';
import { Payload } from 'src/auth/jwt/jwt.payload';

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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateResponse<UserResponseType>> {
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
      await this.userRepository.save(createUserDto);
      const user: UserResponseType = await this.findByStudentNumber(
        createUserDto.studentNumber,
      );
      return SuccessHanlder.getCreateSuccessResponse(user, this.USER);
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        CreateExceptionHandler.throwInvalidForeignKeyException(
          this.MAJOR,
          createUserDto.majorName,
        );
      } else {
        CommonExceptionHandler.throwBadRequestException(error.message);
      }
    }
  }

  async findAll(
    page: number,
    per_page: number,
  ): Promise<ReadAllWithPaginationResponse<UserResponseType>> {
    const users: UserResponseType[] = await new GetAllUsers(
      this.userRepository,
      page,
      per_page,
    ).excuteQuery();

    const totalCount = await this.userRepository.count();
    const total_page = Math.ceil(totalCount / per_page);

    return SuccessHanlder.getReadAllWithPaginationSuccessResponse(
      users,
      this.USER,
      page,
      per_page,
      total_page,
    );
  }

  async findOne(
    studentNumber: number,
  ): Promise<ReadOneResponse<UserResponseType>> {
    const user: UserResponseType = await this.findByStudentNumber(
      studentNumber,
    );
    if (!user) {
      ReadExceptionHandler.throwNotFoundException(
        this.STUDENT_NUMBER,
        studentNumber.toString(),
      );
    }
    return SuccessHanlder.getReadOneSuccessResponse(user, this.USER);
  }

  async update(studentNumber: number, updateUserDto: UpdateUserDto) {
    const isUserExist = await this.findByStudentNumber(studentNumber);
    if (!isUserExist) {
      UpdateExceptionHandler.throwNotFoundException(
        this.STUDENT_NUMBER,
        studentNumber.toString(),
      );
    }
    try {
      const result = await this.userRepository.update(
        { studentNumber },
        updateUserDto,
      );
      return SuccessHanlder.getUpdateSuccessResponse(
        result.affected,
        this.USER,
      );
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        UpdateExceptionHandler.throwInvalidForeignKeyException(
          this.MAJOR,
          updateUserDto.majorName,
        );
      } else {
        CommonExceptionHandler.throwBadRequestException(error.message);
      }
    }
  }

  async remove(studentNumber: number) {
    const isUserExist = await this.findByStudentNumber(studentNumber);
    if (!isUserExist) {
      DeleteExceptionHandler.throwNotFoundException(
        this.STUDENT_NUMBER,
        studentNumber.toString(),
      );
    }
    const result = await this.userRepository.delete({ studentNumber });
    return SuccessHanlder.getDeleteSuccessResponse(result.affected, this.USER);
  }

  async findByUserId(userId: string): Promise<UserResponseType | null> {
    return await new GetUserById(userId, this.userRepository).excuteQuery();
  }

  async findByStudentNumber(
    studentNumber: number,
  ): Promise<UserResponseType | null> {
    return await new GetUserByStudentNumber(
      studentNumber,
      this.userRepository,
    ).excuteQuery();
  }

  async findRawUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userId } });
  }
}
