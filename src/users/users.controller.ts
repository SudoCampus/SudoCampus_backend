import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, SudoJwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(SudoJwtAuthGuard)
  @Get()
  findAll(@Query('page') page: number, @Query('per_page') per_page: number) {
    return this.usersService.findAll(page, per_page);
  }

  @UseGuards(SudoJwtAuthGuard)
  @Get(':studentNumber')
  findOne(@Param('studentNumber') id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':studentNumber')
  update(
    @Param('studentNumber') studentNumber: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(studentNumber, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':studentNumber')
  remove(@Param('studentNumber') studentNumber: number) {
    return this.usersService.remove(studentNumber);
  }
}
