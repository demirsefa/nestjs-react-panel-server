import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userData: Partial<UserEntity>) {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: Partial<UserEntity>) {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
